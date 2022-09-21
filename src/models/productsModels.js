const conn = require('../db/connection');

const getProducts = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return result;
};

const getProductById = async (id) => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?);',
    [id],
  );
  return result;
};

const createProduct = async (body) => {
  const [result] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [body.name],
  );
  return result;
};

const updateProduct = async (id, body) => {
  const [result] = await conn.execute(
    `UPDATE StoreManager.products SET name = (?)
    WHERE id = (?);`,
    [body.name, id],
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = (?);',
    [id],
  );
  return result;
};

const searchProduct = async (queryQ) => {
  const [result] = await conn.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE "%${queryQ}%";`,
  );
  return result;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};