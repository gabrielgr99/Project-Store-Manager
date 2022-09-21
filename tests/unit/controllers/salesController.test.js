const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const salesController = require('../../../src/controllers/salesController');
const salesServices = require('../../../src/services/salesServices');

const salesModelsMock = require('../models/mocks/salesModels.mock');

describe('Testes de unidade do controller de vendas', function () {
  it('Criando uma nova venda', async function () {
    const { rightSaleBody } = salesModelsMock;
    sinon.stub(salesServices, 'createSale').resolves({ status: 201, message: { id: 3, itemsSold: rightSaleBody } });

    const res = {};
    const req = { body: rightSaleBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.createSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 3, itemsSold: rightSaleBody });
  });

  it('Pegando todas as vendas', async function () {
    const { rightSaleResponse } = salesModelsMock;
    sinon.stub(salesServices, 'getSales').resolves({ status: 200, message: rightSaleResponse });

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(rightSaleResponse);
  });

  it('Pegando uma venda pelo ID', async function () {
    const { rightSaleByIdResponse } = salesModelsMock;
    sinon.stub(salesServices, 'getSaleById').resolves({ status: 200, message: rightSaleByIdResponse });

    const res = {};
    const req = { params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(rightSaleByIdResponse);
  });

  it('Deletando um produto pelo ID', async function () {
    sinon.stub(salesServices, 'deleteSale').resolves({ status: 204, message: '' });

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith('');
  });

  it('Alterando as informações de uma venda', async function () {
    const { rightSaleBody } = salesModelsMock;
    sinon.stub(salesServices, 'updateSale').resolves({ status: 200, message: rightSaleBody });

    const res = {};
    const req = { body: rightSaleBody, params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(rightSaleBody);
  });

  afterEach(sinon.restore);
});