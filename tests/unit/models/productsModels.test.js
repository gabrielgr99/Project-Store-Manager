const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/db/connection');
const productsModels = require('../../../src/models/productsModels');

const productsModelsMock = require('./mocks/productsModels.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Pegando todos os produtos', async function () {
    const { allProductsResponse } = productsModelsMock;
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    const result = await productsModels.getProducts();
    expect(result).to.equal(allProductsResponse);
  });

  it('Pegando o produto pelo id', async function () {
    const { allProductsResponse } = productsModelsMock;
    sinon.stub(connection, 'execute').resolves([allProductsResponse[0]]);
    const result = await productsModels.getProductById(1);
    expect(result).to.equal(allProductsResponse[0]);
  });

  it('Criando um novo produto', async function () {
    const { rightProductBody } = productsModelsMock;
    sinon.stub(connection, 'execute').resolves([{ insertId: 4}]);
    const result = await productsModels.createProduct(rightProductBody);
    expect(result.insertId).to.equal(4);
  });

  it('Alterando nome de um produto', async function () {
    const { rightProductBody } = productsModelsMock;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModels.updateProduct(1, rightProductBody);
    expect(result.affectedRows).to.equal(1);
  });

  it('Deletando um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModels.deleteProduct(1);
    expect(result.affectedRows).to.equal(1);
  });

  it('Pesquisando produto pelo nome', async function () {
    const { productSearchResponse } = productsModelsMock;
    sinon.stub(connection, 'execute').resolves([productSearchResponse]);
    const result = await productsModels.searchProduct('Martelo');
    expect(result).to.equal(productSearchResponse);
  });

  afterEach(sinon.restore);
});