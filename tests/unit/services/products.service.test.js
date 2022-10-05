const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models/');
const { productService } = require('../../../src/services/');

const { productsMock } = require('../../mocks/products.model.mocks');

describe('testando a o GET camada service', function () {

  beforeEach(async () => {
    await sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
  });

  afterEach(async function () {
    await sinon.restore();
  });
  it('retorna todos produtos', async function () {
    const result = await productService.getAllProducts();

    expect(result).to.equal(productsMock);
  });

  it('retorna produto por id', async function () {
    // await sinon.stub(productModel, 'queryProductById').resolves(productsMock[0]);
    const result = await productService.getProductById(1);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(productsMock[0]);

  });

  it('retorna erro caso id não exista', async function () {
    const result = await productService.getProductById([]);
    
    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.equal('Product not found');
  });

});

describe('testando o INSERT do service', function () {
  beforeEach(async () => {
    await sinon.stub(productModel, 'insertProductModel').resolves(42);
  });

  afterEach(async () => {
    await sinon.restore();
  });

  it('insere um produto como nome certo', async function () {
    const objeto = { name: 'teste' };
    await sinon.stub(productModel, 'queryAllProducts').resolves([...productsMock, objeto]);
    const result = await productService.insertProductService(objeto);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(objeto);
  });

  it('insere um produto como nome cujo numero de caracteres seja menor que 5', async function () {
    const objeto = { name: 'tese' };
    const result = await productService.insertProductService(objeto);

    expect(result.type).to.equal(422);
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('insere um produto sem nome', async function () {
    const objeto = {nasme: 'teste'};
    const result = await productService.insertProductService(objeto);

    expect(result.type).to.equal(400);
    expect(result.message).to.equal('"name" is required');
  });

});

describe('testando o UPDATE do service', function () {
  beforeEach(async () => {
    await sinon.stub(productModel, 'updateProductModel').resolves(42);
    await sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
  });

  afterEach(async () => {
    await sinon.restore();
  });

  it('atualiza um produto com nome correto', async function () {
    const objeto = { name: 'teste' };
    const response = { ...objeto, id: 1 };
    
    const result = await productService.updateProductService(1, objeto);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(response);
  });

  it('atualiza um produto com nome cujo numero de caracteres seja menor que 5', async function () {
    const objeto = { name: 'tese' };
    
    const result = await productService.updateProductService(1, objeto);

    expect(result.type).to.equal(422);
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('atualiza um produto sem nome', async function () {
    const objeto = { nasme: 'teste' };
    
    const result = await productService.updateProductService(1, objeto);

    expect(result.type).to.equal(400);
    expect(result.message).to.equal('"name" is required');
  });
});

describe('testando o DELETE do service', function () {
  beforeEach(async () => {
    await sinon.stub(productModel, 'deleteProductModel').resolves(42);
    await sinon.stub(productModel, 'queryAllProducts').resolves(productsMock);
  });

  afterEach(async () => {
    await sinon.restore();
  });

  it('deleta um produto', async function () {
    const result = await productService.deleteProductService(1);

    expect(result.type).to.equal(null);
  });

  it('deleta um produto que não existe', async function () {
    const result = await productService.deleteProductService(42);

    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });
});
