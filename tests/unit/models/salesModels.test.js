const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const salesModels = require('../../../src/models/salesModels');

const salesModelsMock = require('./mocks/salesModels.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Criando uma nova venda na tabela sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3}]);
    const result = await salesModels.createSaleDate();
    expect(result.insertId).to.equal(3);
  });

  it('Criando uma nova venda na tabela sales_products', async function () {
    const { rightSaleBody } = salesModelsMock;
    sinon.stub(connection, 'execute').resolves([{ insertId: 0 }]);
    const result = await salesModels.createSale(3, rightSaleBody[0]);
    expect(result.insertId).to.equal(0);
  });

  it('Pegando todas as vendas', async function () {
    const { rightSaleResponse } = salesModelsMock;
    sinon.stub(connection, 'execute').resolves([rightSaleResponse]);
    const result = await salesModels.getSales();
    expect(result).to.equal(rightSaleResponse);
  });

  it('Pegando a venda pelo ID', async function () {
    const { rightSaleByIdResponse } = salesModelsMock;
    sinon.stub(connection, 'execute').resolves([rightSaleByIdResponse]);
    const result = await salesModels.getSaleById(2);
    expect(result).to.equal(rightSaleByIdResponse);
  });

  it('Deletando a data de uma venda pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await salesModels.deleteSale(1);
    expect(result.affectedRows).to.equal(1);
  });

  it('Deletando os produtos da venda pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 2 }]);
    const result = await salesModels.deleteSalesProducts(1);
    expect(result.affectedRows).to.equal(2);
  });

  afterEach(sinon.restore);
});