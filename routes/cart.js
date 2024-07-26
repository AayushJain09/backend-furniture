const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/find/:id', cartController.getCart);
router.post('/', cartController.addToCart);
router.post('/decrement', cartController.decrementCartItem);
router.delete('/:cartItemId', cartController.deleteCartItem);
router.post('/increment', cartController.incrementCartItem);

module.exports = router;