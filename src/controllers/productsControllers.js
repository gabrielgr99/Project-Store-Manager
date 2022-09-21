const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const { status, message } = await productsServices.getProducts();
  return res.status(status).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsServices.getProductById(id);
  res.status(status).json(message);
};

const createProduct = async (req, res) => {
  const { body } = req;
  const { status, message } = await productsServices.createProduct(body);
  res.status(status).json(message);
};

const updateProduct = async (req, res) => {
  const { body, params } = req;
  const { status, message } = await productsServices.updateProduct(params.id, body);
  res.status(status).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsServices.deleteProduct(id);
  res.status(status).json(message);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, message } = await productsServices.searchProduct(q);

  return res.status(status).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};