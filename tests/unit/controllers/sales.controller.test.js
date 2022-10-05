const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const { expect } = chai;
chai.use(sinonChai);

const { productModel } = require('../../../src/models/');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesControler } = require('../../../src/controllers');
const {
  salesListMock,
  newSaleMock,
  saleResponseControllerMock,
  newSaleMockMissingProductIdPropertie,
  newSaleMockMissingQuantityPropertie,
  newSaleMockWrongQuantity,
  newSaleMockMissingProductIdInTheBank,
  responseOfGetAllSalesWithProductsMock,
  responseOfGetSalesByIdMock,
} = require('../../mocks/sales.model.mock');

const { productsMock } = require('../../mocks/products.model.mocks');


describe('testando o GET da camada controller', function () {
  beforeEach(async () => {
    await sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);
  });
  afterEach(async () =>{
    await sinon.restore();
  });
  it('retorna todas as vendas', async function () {
    // await sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControler.getAllSalesController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesListMock);

  });

  it('retorna todas as vendas com produtos', async function () {
    const res = {};
    const req = {};
    await sinon.stub(salesModel, 'queryAllSalesWithProductsModel').resolves(responseOfGetAllSalesWithProductsMock);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControler.queryAllSalesWithProductsController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseOfGetAllSalesWithProductsMock);

  });

  it('retorna uma venda por id', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };
    await sinon.stub(salesService, 'getSalesByIdService').resolves({ type: null, message: responseOfGetSalesByIdMock });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControler.getSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(responseOfGetSalesByIdMock);

  });

  it('retorna erro quando é buscada uma venda por id quando não há o ID no banco', async function () {
    const res = {};
    const req = { params: { id: 99 } };
    await sinon.stub(salesModel, 'queryAllSalesWithProductsModel').resolves(responseOfGetAllSalesWithProductsMock);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControler.getSalesByIdController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });

  });

});

describe('testando o INSERT da camada controller', function () {
  beforeEach(async () => {

    await sinon.stub(productModel, 'queryAllProducts').returns(productsMock);
  });
 
  afterEach(async () => {
    await sinon.restore();
  });

  it('insere a venda de um ou mais produtos', async function () {

    // await sinon.stub(productModel, 'queryAllProducts').returns(productsMock);
    // await sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);
    // await sinon.stub(salesModel, 'insertDate').resolves(42);
    

    const newSaleMockClone = JSON.parse(JSON.stringify(newSaleMock));

    const res = {};
    const req = { body: newSaleMockClone };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    
    sinon.stub(salesService, 'insertSalesService').resolves({ type: null, message: 'serviceResponse' });
    // sinon.stub(salesModel, 'insertSales').resolves(42);
    await salesControler.insertSalesController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith('serviceResponse');

  });

  it('insere a venda de um ou mais produtos sem a propriedade productId', async function () {

    // await sinon.stub(productModel, 'queryAllProducts').returns(productsMock);

    const newSaleMockClone = JSON.parse(JSON.stringify(newSaleMockMissingProductIdPropertie));

    const res = {};
    const req = { body: newSaleMockClone };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesService, 'insertSalesService').resolves({ type: null });

    await salesControler.insertSalesController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });

  });

  it('insere a venda de um ou mais produtos sem a propriedade quantity', async function () {

    const newSaleMockClone = JSON.parse(JSON.stringify(newSaleMockMissingQuantityPropertie));

    const res = {};
    const req = { body: newSaleMockClone };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesService, 'insertSalesService').resolves({ type: null });

    await salesControler.insertSalesController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });

  });

  it('insere a venda de um ou mais produtos com a quantidade errada', async function () {

    const newSaleMockClone = JSON.parse(JSON.stringify(newSaleMockWrongQuantity));

    const res = {};
    const req = { body: newSaleMockClone };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesService, 'insertSalesService').resolves({ type: null });

    await salesControler.insertSalesController(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });

  });

  it('insere a venda de um ou mais produtos com a quantidade errada', async function () {

    const newSaleMockClone = JSON.parse(JSON.stringify(newSaleMockMissingProductIdInTheBank));

    const res = {};
    const req = { body: newSaleMockClone };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    // sinon.stub(salesService, 'insertSalesService').resolves({ type: null });

    await salesControler.insertSalesController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  });

});

describe('testando o DELETE da camada controller', function () {
  afterEach(async () => {
    await sinon.restore();
  });

  it('deleta a venda de um produto', async function () {
    await sinon.stub(salesService, 'deleteSalesService').resolves({ type: null, message: '' });
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControler.deleteSalesController(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith('');

  });

  it('deleta a venda de um produto', async function () {
    await sinon.stub(salesService, 'deleteSalesService').resolves({ type: 404, message: 'Sale not found' });
    const res = {};
    const req = { params: { id: 42 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesControler.deleteSalesController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Sale not found'});

  });
});
