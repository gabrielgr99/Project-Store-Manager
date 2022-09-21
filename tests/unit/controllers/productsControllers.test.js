const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const productsController = require('../../../src/controllers/productsControllers');
const productsServices = require('../../../src/services/productsServices');

const productsModelsMock = require('../models/mocks/productsModels.mock');

describe('Testes de unidade do controller de produtos', function () {
  it('Pegando todos os produtos', async function () {
    const { allProductsResponse } = productsModelsMock;
    sinon.stub(productsServices, 'getProducts').resolves({ status: 200, message: [allProductsResponse] });

    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([allProductsResponse])
  });

  it('Pegando o produto por um id existente', async function () {
    const { productSearchResponse } = productsModelsMock;
    sinon.stub(productsServices, 'getProductById').resolves({ status: 200, message: productSearchResponse });

    const res = {};
    const req = { params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productSearchResponse);
  });

  it('Pegando o produto por um id inexistente', async function () {
    const { productNotFound } = productsModelsMock;
    sinon.stub(productsServices, 'getProductById').resolves({ status: 404, message: productNotFound });

    const res = {};
    const req = { params: { id: 9999 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productNotFound);
  });

  it('Criando novo produto', async function () {
    const { productCreateResponse, productUpdateBody } = productsModelsMock;
    sinon.stub(productsServices, 'createProduct').resolves({ status: 201, message: productCreateResponse });

    const res = {};
    const req = { body: productUpdateBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreateResponse);
  });

  it('Alterando o nome de um produto', async function () {
    const { productUpdateBody, productUpdateResponse } = productsModelsMock;
    sinon.stub(productsServices, 'updateProduct').resolves({ status: 200, message: productUpdateResponse });

    const res = {};
    const req = { body: productUpdateBody, params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: productUpdateBody.name });
  });

  it('Deletando um produto pelo ID', async function () {
    sinon.stub(productsServices, 'deleteProduct').resolves({ status: 204, message: '' });

    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith('');
  });

  it('Pesquisando produto pelo nome', async function () {
    const { productSearchIdResponse } = productsModelsMock;
    sinon.stub(productsServices, 'searchProduct').resolves({ status: 200, message: productSearchIdResponse });

    const res = {};
    const req = { query: { q: 'Martelo' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsController.searchProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productSearchIdResponse);
  });

  afterEach(sinon.restore);
});