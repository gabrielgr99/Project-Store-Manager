const router = require('express').Router();
const productsController = require('../controllers/productsControllers');
const { isValidId, isValidBody } = require('../middlewares/productsMiddlewares');

router.get('/', productsController.getProducts);

router.get('/search', productsController.searchProduct);

router.get('/:id', isValidId, productsController.getProductById);

router.post('/', isValidBody, productsController.createProduct);

router.put('/:id', isValidBody, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;