const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models/');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services/');

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

describe('testando a o GET da camada service', function () {
  afterEach(async () => {
    await sinon.restore();
  });
  it('retorna todos vendas', async function () {
    sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);

    const result = await salesService.getAllSalesService();

    expect(result).to.equal(salesListMock);
  });
  it('retorna todas as vendas com produtos', async function () {
    sinon.stub(salesModel, 'queryAllSalesWithProductsModel').resolves(responseOfGetAllSalesWithProductsMock);

    const result = await salesService.queryAllSalesWithProductsService();

    expect(result).to.equal(responseOfGetAllSalesWithProductsMock);
  });
  it('retorna uma venda por id', async function () {
    sinon.stub(salesModel, 'queryAllSalesWithProductsModel').resolves(responseOfGetAllSalesWithProductsMock);
    // sinon.stub(salesModel, 'insertDate').resolves(44);

    // const responseOfGetSalesByIdMockClone = JSON.parse(JSON.stringify(responseOfGetSalesByIdMock));

    const result = await salesService.getSalesByIdService(1);


    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(responseOfGetSalesByIdMock);
  });
  it('retorna erro quando o ID não existe na busca por venda por ID', async function () {
    sinon.stub(salesModel, 'queryAllSalesWithProductsModel').resolves(responseOfGetAllSalesWithProductsMock);

    const result = await salesService.getSalesByIdService(42);

    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.deep.equal('Sale not found');
  });
});


describe('testando o INSERT do service', function () {
  beforeEach(async () => {
    await sinon.stub(salesModel, 'insertSales').resolves(42);
    await sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
  });

  afterEach(async () => {
    await sinon.restore();
  });

  it('insere produtos a serem vendidos', async function () {
    await sinon.stub(salesModel, 'insertDate').resolves(43);
    await sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);
    const result = await salesService.insertSalesService(newSaleMock);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(saleResponseControllerMock);
  });

  it('insere produtos a serem vendidos faltando a propriedade productId', async function () {
    const result = await salesService.insertSalesService(newSaleMockMissingProductIdPropertie);

    expect(result.type).to.equal(400);
    expect(result.message).to.equal('"productId" is required');
  });

  it('insere produtos a serem vendidos faltando a propriedade quantity', async function () {
    const result = await salesService.insertSalesService(newSaleMockMissingQuantityPropertie);

    expect(result.type).to.equal(400);
    expect(result.message).to.be.equal('"quantity" is required');
  });

  it('insere produtos a serem vendidos com a quantidade errada', async function () {
    const result = await salesService.insertSalesService(newSaleMockWrongQuantity);

    expect(result.type).to.equal(422);
    expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('insere produtos a serem vendidos sem ter o produto para vender', async function () {
    const result = await salesService.insertSalesService(newSaleMockMissingProductIdInTheBank);

    expect(result.type).to.equal(404);
    expect(result.message).to.be.equal('Product not found');
    
  });

});

describe('testando o DELETE do service', function () {
  beforeEach(async () => {
    await sinon.stub(salesModel, 'queryAllSalesWithProductsModel').resolves(responseOfGetAllSalesWithProductsMock);
    await sinon.stub(salesModel, 'deleteSalesModel').resolves(42);
  });
  afterEach(async () => {
    await sinon.restore();
  });
  it('deleta uma venda', async function () {
    const result = await salesService.deleteSalesService(1);
    expect(result.type).to.equal(null);
  });

  it('deleta uma venda que não existe', async function () {
    const result = await salesService.deleteSalesService(42);
    expect(result.type).to.equal(404);
    expect(result.message).to.be.equal('Sale not found');
  });
});

