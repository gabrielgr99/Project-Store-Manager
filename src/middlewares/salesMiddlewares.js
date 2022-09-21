const productsModels = require('../models/productsModels');

const isValidBody = (req, res, next) => {
  const { body } = req;

  if (!(body.every((element) => 'productId' in element))) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!(body.every((element) => 'quantity' in element))) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const isQuantityValid = (req, res, next) => {
  const { body } = req;

  if (body.some((element) => element.quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const isProductExist = async (req, res, next) => {
  const { body } = req;
  let allProductsId = await productsModels.getProducts();
  allProductsId = allProductsId.map((mapProduct) => mapProduct.id);

  if (!(body.every((product) => allProductsId.includes(product.productId)))) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  isValidBody,
  isQuantityValid,
  isProductExist,
};