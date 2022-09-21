const rightProductBody = { name: 'Produto1' };
const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];
const productCreateResponse = { id: 4, name: 'Produto1' };
const productUpdateResponse = { id: 1, name: 'Machado do Thor Stormbreaker' }
const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };
const productSearchResponse = [{ id: 1, name: 'Martelo de Thor' }];
const productSearchIdResponse = { id: 1, name: 'Martelo de Thor' };
const productNotFound = { message: 'Product not found' };

module.exports = {
  rightProductBody,
  allProductsResponse,
  productCreateResponse,
  productUpdateResponse,
  productUpdateBody,
  productSearchResponse,
  productSearchIdResponse,
  productNotFound,
};