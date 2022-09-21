const rightSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];
const rightSaleResponse = [
  {
    "saleId": 1,
    "date": "2022-09-14T17:41:21.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-09-14T17:41:21.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-09-14T17:41:21.000Z",
    "productId": 3,
    "quantity": 15
  }
];
const rightSaleByIdResponse = [
  {
    "date": "2022-09-14T17:41:21.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-09-14T17:41:21.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
  rightSaleBody,
  rightSaleResponse,
  rightSaleByIdResponse,
};