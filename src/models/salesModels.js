const conn = require('../db/connection');

const createSaleDate = async () => {
  const [result] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  return result;
};

const createSale = async (saleId, product) => {
  const [result] = await conn.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, product.productId, product.quantity],
  );
  return result;
};

const getSales = async () => {
  const [result] = await conn.execute(
    `SELECT sale_id AS saleId,
      date,
      product_id AS productId,
      quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    ORDER BY sale_id, product_id;`,
  );
  return result;
};

const getSaleById = async (saleId) => {
  const [result] = await conn.execute(
    `SELECT date,
      product_id AS productId,
      quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    WHERE StoreManager.sales.id = (?)
    ORDER BY sale_id, product_id;`,
    [saleId],
  );
  return result;
};

const deleteSale = async (saleId) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?);',
    [saleId],
  );
  return result;
};

const deleteSalesProducts = async (saleId) => {
  const [result] = await conn.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = (?);',
    [saleId],
  );
  return result;
};

module.exports = {
  createSaleDate,
  createSale,
  getSales,
  getSaleById,
  deleteSale,
  deleteSalesProducts,
};