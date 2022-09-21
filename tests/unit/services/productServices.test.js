const { expect } = require('chai');
const sinon = require('sinon');

const productsModels = require('../../../src/models/productsModels');
const productsServices = require('../../../src/services/productsServices');

const productsModelsMock = require('../models/mocks/productsModels.mock');

describe('Testes de unidade de services de produtos', function () {
  it('Pegando todos os produtos', async function () {
    const { allProductsResponse } = productsModelsMock;
    sinon.stub(productsModels, 'getProducts').resolves(allProductsResponse);
    const result = await productsServices.getProducts();
    expect(result).to.deep.equal({ status: 200, message: allProductsResponse });
  });

  it('Pegando o produto por um id existente', async function () {
    const { productSearchResponse } = productsModelsMock;
    sinon.stub(productsModels, 'getProductById').resolves(productSearchResponse);
    const result = await productsServices.getProductById(1);
    expect(result).to.deep.equal({ status: 200, message: productSearchResponse[0] });
  });

  it('Pegando o produto por um id inexistente', async function () {
    const { productNotFound } = productsModelsMock;
    sinon.stub(productsModels, 'getProductById').resolves([]);
    const result = await productsServices.getProductById(1);
    expect(result).to.deep.equal({ status: 404, message: productNotFound });
  });

  it('Criando novo produto com retorno correto', async function () {
    const { rightProductBody } = productsModelsMock;
    sinon.stub(productsModels, 'createProduct').resolves({ insertId: 4 });
    const result = await productsServices.createProduct(rightProductBody);
    expect(result).to.deep.equal({ status: 201, message: { id: 4, name: 'Produto1' } });
  });

  it('Criando novo produto com retorno incorreto', async function () {
    const { rightProductBody } = productsModelsMock;
    sinon.stub(productsModels, 'createProduct').resolves({});
    const result = await productsServices.createProduct(rightProductBody);
    expect(result).to.deep.equal({ status: 404, message: { message: 'Product not created' } });
  });

  it('Alterando o nome de um produto', async function () {
    const { rightProductBody } = productsModelsMock;
    sinon.stub(productsModels, 'updateProduct').resolves({ affectedRows: 1 });
    const result = await productsServices.updateProduct(1, rightProductBody);
    expect(result).to.deep.equal({ status: 200, message: { id: 1, name: rightProductBody.name } });
  });

  it('Alterando o nome de um produto com id inexistente', async function () {
    const { rightProductBody } = productsModelsMock;
    sinon.stub(productsModels, 'updateProduct').resolves({ affectedRows: 0 });
    const result = await productsServices.updateProduct(0, rightProductBody);
    expect(result).to.deep.equal({ status: 404, message: { message: 'Product not found' } });
  });

  it('Deletando um produto pelo ID', async function () {
    sinon.stub(productsModels, 'deleteProduct').resolves({ affectedRows: 1 });
    const result = await productsServices.deleteProduct(1);
    expect(result).to.deep.equal({ status: 204, message: '' });
  });

  it('Deletando um produto por um ID inexistente', async function () {
    sinon.stub(productsModels, 'deleteProduct').resolves({ affectedRows: 0 });
    const result = await productsServices.deleteProduct(1);
    expect(result).to.deep.equal({ status: 404, message: { message: 'Product not found' } });
  });

  it('Pesquisando produto pelo nome', async function () {
    const { productSearchIdResponse } = productsModelsMock;
    sinon.stub(productsModels, 'searchProduct').resolves(productSearchIdResponse);
    const result = await productsServices.searchProduct('Martelo');
    expect(result).to.deep.equal({ status: 200, message: productSearchIdResponse });
  });

  afterEach(sinon.restore);
});