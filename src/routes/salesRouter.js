const router = require('express').Router();
const salesController = require('../controllers/salesController');
const { isValidBody, isQuantityValid, isProductExist } = require('../middlewares/salesMiddlewares');

router.post('/', isValidBody, isQuantityValid, isProductExist, salesController.createSale);

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSaleById);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', isValidBody, isQuantityValid, isProductExist, salesController.updateSale);

module.exports = router;