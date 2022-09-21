const salesServices = require('../services/salesServices');

const createSale = async (req, res) => {
  const { body } = req;
  const { status, message } = await salesServices.createSale(body);
  return res.status(status).json(message);
};

const getSales = async (_req, res) => {
  const { status, message } = await salesServices.getSales();
  return res.status(status).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesServices.getSaleById(id);

  return res.status(status).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesServices.deleteSale(id);

  return res.status(status).json(message);
};

const updateSale = async (req, res) => {
  const { body, params } = req;
  const { status, message } = await salesServices.updateSale(params.id, body);

  return res.status(status).json(message);
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};