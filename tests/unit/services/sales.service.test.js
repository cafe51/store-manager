const { expect } = require('chai');
const sinon = require('sinon');

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
} = require('../../mocks/sales.model.mock');

describe('testando a o GET da camada service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('retorna todos produtos', async function () {
    sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);

    const result = await salesService.getAllSalesService();

    expect(result).to.equal(salesListMock);
  });
});


describe('testando o INSERT do service', function () {
  beforeEach(async () => {
    await sinon.stub(salesModel, 'insertSales').resolves(42);
  });

  afterEach(async () => {
    await sinon.restore();
  });

  it('insere produtos a serem vendidos', async function () {
    await sinon.stub(salesModel, 'queryAllSalesModel').resolves(salesListMock);
    const result = await salesService.insertSalesService(newSaleMock);
    expect(result.type).to.equal(null);
    // console.log('LISTA MOCKADA', saleResponseControllerMock);
    // console.log('LISTA RETORNADA', result.message);
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
