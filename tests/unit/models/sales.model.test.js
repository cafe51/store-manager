const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { salesModel} = require('../../../src/models');

const { salesListMock, newSaleMock } = require('../../mocks/sales.model.mock');

describe('testando o SELECT do model', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('retorna todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesListMock]);

    const result = await salesModel.queryAllSalesModel();

    expect(result).to.equal(salesListMock);
  });

  describe('testando o INSERT do model', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('insere um produto', async function () {
      // sinon.stub()
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await salesModel.insertSalesModel(newSaleMock);
      console.log('AAAAAAAAA', result)
      expect(result).to.equal(42);
    });
  });

});
