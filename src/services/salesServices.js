const salesModels = require('../models/salesModels');

const createSale = async (body) => {
  const { insertId } = await salesModels.createSaleDate();

  await Promise.all(body.map(async (product) => {
    const added = await salesModels.createSale(insertId, product);
    return added;
  }));

  const message = {
    id: insertId,
    itemsSold: body,
  };

  if (insertId) return { status: 201, message };
};

const getSales = async () => {
  const result = await salesModels.getSales();
  return { status: 200, message: result };
};

const getSaleById = async (saleId) => {
  const result = await salesModels.getSaleById(saleId);

  if (result.length === 0) return { status: 404, message: { message: 'Sale not found' } };

  return { status: 200, message: result };
};

const deleteSale = async (saleId) => {
  const firstResult = await salesModels.deleteSalesProducts(saleId);
  const secondResult = await salesModels.deleteSale(saleId);

  if (firstResult.affectedRows > 0 && secondResult.affectedRows > 0) {
    return { status: 204, message: '' };
  }
  return { status: 404, message: { message: 'Sale not found' } };
};

const updateSale = async (saleId, body) => {
  const result = await salesModels.deleteSalesProducts(saleId);

  const message = { saleId: Number(saleId), itemsUpdated: body };

  if (result.affectedRows > 0) {
    await Promise.all(body.map(async (product) => {
      const added = await salesModels.createSale(saleId, product);
      return added;
    }));
    return { status: 200, message };
  }
  return { status: 404, message: { message: 'Sale not found' } };
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};