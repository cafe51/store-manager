const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
const { expect } = chai;
chai.use(sinonChai);

const { productModel } = require('../../../src/models/');
const { productControler } = require('../../../src/controllers');
const { productsMock } = require('../../mocks/products.model.mocks');


describe('testando a camada controller', function () {
  beforeEach(async function () {
    await sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
  });

  afterEach(async function () {
    await sinon.restore();
  });
  it('retorna todos produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.showAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
    
  });

  it('retorna produto por id', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.showProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock[0]);

  });

  it('retorna erro caso id não exista', async function () {
    const res = {};
    const req = { params: { id: 99 }, body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

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

    await sinon.stub(productModel, 'queryAllProducts').resolves([...productsMock, { id: 4, name: "Mascara do super-homem" }]);

    const res = {};
    const req = { body: { name: "Mascara do super-homem" } };
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    await productControler.insertProductController(req, res);
    
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 4, name: 'Mascara do super-homem' });
    
  });


  it('insere um produto com o campo vazio', async function () {

    const res = {};
    const req = {body: {}};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.insertProductController(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: "\"name\" is required" });
  });
});