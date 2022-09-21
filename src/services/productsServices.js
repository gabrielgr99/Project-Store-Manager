const productsModels = require('../models/productsModels');

const getProducts = async () => {
  const result = await productsModels.getProducts();
  return { status: 200, message: result };
};

const getProductById = async (id) => {
  const result = await productsModels.getProductById(id);
  
  if (result.length > 0) return { status: 200, message: result[0] };
  return { status: 404, message: { message: 'Product not found' } };
};

const createProduct = async (body) => {
  const result = await productsModels.createProduct(body);
  const message = { id: result.insertId, name: body.name };
  
  if (result.insertId) return { status: 201, message };
  return { status: 404, message: { message: 'Product not created' } };
};

const updateProduct = async (id, body) => {
  const result = await productsModels.updateProduct(id, body);
  const message = { id, name: body.name };

  if (result.affectedRows > 0) return { status: 200, message };
  return { status: 404, message: { message: 'Product not found' } };
};

const deleteProduct = async (id) => {
  const result = await productsModels.deleteProduct(id);

  if (result.affectedRows > 0) return { status: 204, message: '' };
  return { status: 404, message: { message: 'Product not found' } };
};

const searchProduct = async (queryQ) => {
  const result = await productsModels.searchProduct(queryQ);

  return { status: 200, message: result };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};