const { expect } = require('chai');
const sinon = require('sinon');

const salesModels = require('../../../src/models/salesModels');
const salesServices = require('../../../src/services/salesServices');

const salesModelsMock = require('../models/mocks/salesModels.mock');

describe('Testes de unidade de services de vendas', function () {
  it('Criando uma nova venda', async function () {
    const { rightSaleBody } = salesModelsMock;
    sinon.stub(salesModels, 'createSaleDate').resolves({ insertId: 3 });
    sinon.stub(salesModels, 'createSale').resolves();
    const result = await salesServices.createSale(rightSaleBody);
    expect(result).to.deep.equal({ status: 201, message: { id: 3, itemsSold: rightSaleBody } });
  });

  it('Pegando todas as vendas', async function () {
    const { rightSaleResponse } = salesModelsMock;
    sinon.stub(salesModels, 'getSales').resolves(rightSaleResponse);
    const result = await salesServices.getSales();
    expect(result).to.deep.equal({ status: 200, message: rightSaleResponse });
  });

  it('Pegando uma venda pelo ID', async function () {
    const { rightSaleByIdResponse } = salesModelsMock;
    sinon.stub(salesModels, 'getSaleById').resolves(rightSaleByIdResponse);
    const result = await salesServices.getSaleById(2);
    expect(result).to.deep.equal({ status: 200, message: rightSaleByIdResponse });
  });

  it('Pegando uma venda por um ID inválido', async function () {
    sinon.stub(salesModels, 'getSaleById').resolves([]);
    const result = await salesServices.getSaleById(9999);
    expect(result).to.deep.equal({ status: 404, message: { message: 'Sale not found' } });
  });

  it('Deletando uma venda pelo ID', async function () {
    sinon.stub(salesModels, 'deleteSale').resolves({ affectedRows: 1 });
    sinon.stub(salesModels, 'deleteSalesProducts').resolves({ affectedRows: 2 });
    const result = await salesServices.deleteSale(1);
    expect(result).to.deep.equal({ status: 204, message: '' });
  });

  it('Deletando uma venda por um ID inexistente', async function () {
    sinon.stub(salesModels, 'deleteSale').resolves({ affectedRows: 0 });
    sinon.stub(salesModels, 'deleteSalesProducts').resolves({ affectedRows: 0 });
    const result = await salesServices.deleteSale(9999);
    expect(result).to.deep.equal({ status: 404, message: { message: 'Sale not found' } });
  });

  it('Alterando as informações de uma venda com Id existente', async function () {
    const { rightSaleBody } = salesModelsMock;
    sinon.stub(salesModels, 'deleteSalesProducts').resolves({ affectedRows: 2 });
    sinon.stub(salesModels, 'createSale').resolves();
    const result = await salesServices.updateSale(1, rightSaleBody);
    expect(result).to.deep.equal({ status: 200, message: { saleId: 1, itemsUpdated: rightSaleBody } });
  });

  it('Alterando as informações de uma venda com ID inexistente', async function () {
    const { rightSaleBody } = salesModelsMock;
    sinon.stub(salesModels, 'deleteSalesProducts').resolves({ affectedRows: 0 });
    const result = await salesServices.updateSale(9999, rightSaleBody);
    expect(result).to.deep.equal({ status: 404, message: { message: 'Sale not found' } });
  });

  afterEach(sinon.restore);
});