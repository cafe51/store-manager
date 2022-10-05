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
    const req = { params: { id: 1 }, body: {} };

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
    await sinon.stub(productModel, 'insertProductModel').resolves(42);
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

describe('testando o UPDATE do controler', function () {
  afterEach( async () => {
    await sinon.restore();
  });

  it('atualiza um produto', async function () {

    const productMockClone = JSON.parse(JSON.stringify(productsMock));

    await sinon.stub(productModel, 'queryAllProducts').resolves(productMockClone);
    await sinon.stub(productModel, 'updateProductModel').resolves(42);

    const res = {};
    const req = { params: { id: 1 }, body: { name: "Mascara do super-homem" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.updateProductController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'Mascara do super-homem' });

  });

  it('atualiza um produto com nome cujo numero de caracteres seja menor que 5', async function () {

    const productMockClone = JSON.parse(JSON.stringify(productsMock));

    await sinon.stub(productModel, 'queryAllProducts').resolves(productMockClone);
    await sinon.stub(productModel, 'updateProductModel').resolves(42);

    const res = {};
    const req = { params: { id: 1 }, body: { name: "aaa" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.updateProductController(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });

  });

  it('atualiza um produto que não tem no banco de dados e retorna erro', async function () {

    const productMockClone = JSON.parse(JSON.stringify(productsMock));

    await sinon.stub(productModel, 'queryAllProducts').resolves(productMockClone);
    await sinon.stub(productModel, 'updateProductModel').resolves(42);

    const res = {};
    const req = { params: { id: 99 }, body: { name: "Mascara do super-homem" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.updateProductController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});

  });

});

describe('testando o DELETE do controler', function () {
  beforeEach(async () => {
    await sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
  });

  afterEach(async () => {
    await sinon.restore();
  });

  it('deleta um produto', async function () {

    // const productMockClone = JSON.parse(JSON.stringify(productsMock));

    
    await sinon.stub(productModel, 'deleteProductModel').resolves([{ result: 1 }]);

    const res = {};
    const req = { params: { id: 1 }, body: { name: "Mascara do super-homem" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.deleteProductController(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith('');

  });
  it('erro ao tentar deletar um produto que não existe', async function () {

    // const productMockClone = JSON.parse(JSON.stringify(productsMock));

    const res = {};
    const req = { params: { id: 99 }, body: { name: "Mascara do super-homem" } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productControler.deleteProductController(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  });
});

