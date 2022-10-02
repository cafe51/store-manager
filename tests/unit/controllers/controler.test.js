const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services/');
const { productControler } = require('../../../src/controllers/');
const { productsMock } = require('../../mocks/products.model.mocks');


describe('testando a camada controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('retorna todos produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getAllProducts')
      .resolves(productsMock);

    await productControler.showAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
    
  });

  it('retorna produto por id', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getProductById')
      .resolves({type: null, message: productsMock[0]});

    await productControler.showProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock[0]);

  });

  it('retorna erro caso id não exista', async function () {
    const res = {};
    const req = { params: { id: 99 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getProductById')
      .resolves({ type: 404, message: 'Product not found' });

    await productControler.showProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

});

describe('testando o INSERT do controler', function () {
  afterEach( async () => {
    await sinon.restore();
  });

  it('insere um produto', async function () {

    const res = {};
    const req = {};
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon.stub(productService, 'insertProductService').resolves({ type: null });
    
    await productControler.insertProductController(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
  });


  it('insere um produto', async function () {

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'insertProductService').resolves({ type: 400 });

    await productControler.insertProductController(req, res);

    expect(res.status).to.have.been.calledWith(400);
  });
});