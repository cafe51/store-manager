const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel} = require('../../../src/models');

const { salesListMock, newSaleMock, responseOfGetAllSalesWithProductsMock, responseOfGetSalesByIdMock } = require('../../mocks/sales.model.mock');

describe('testando o SELECT do model', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesListMock]);

    const result = await salesModel.queryAllSalesModel();

    expect(result).to.deep.equal(salesListMock);
  });


  it('retorna todas as vendas com produtos', async function () {
    sinon.stub(connection, 'execute').resolves([responseOfGetAllSalesWithProductsMock]);

    const result = await salesModel.queryAllSalesWithProductsModel();
    
    expect(result).to.deep.equal(responseOfGetAllSalesWithProductsMock);
  });

  it('retorna uma venda por id', async function () {
    sinon.stub(connection, 'execute').resolves([responseOfGetSalesByIdMock]);

    const result = await salesModel.getSalesByIdModel(1);

    expect(result).to.deep.equal(responseOfGetSalesByIdMock);
  });

});

describe('testando o INSERT do model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('insere os produtos vendidos', async function () {
    // sinon.stub()
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const result = await salesModel.insertSales(newSaleMock);
    expect(result).to.equal(42);
  });

  it('insere a venda', async function () {
    // sinon.stub()
    sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

    const result = await salesModel.insertDate(newSaleMock);
    expect(result).to.equal(42);
  });
});