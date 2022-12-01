const express = require('express')
const { getCart, addToCart } = require('../controllers/cart')
const router = express.Router()
const {getAllproducts,getProduct,addProduct,updateProduct,deleteProduct}=require('../controllers/products')
const auth = require('../middleware/jwt')
router.route('/').get(auth,getAllproducts).post(auth,addProduct)
router.route('/:id').patch(auth,updateProduct).delete(auth,deleteProduct)
router.route('/filter').get(auth,getProduct)
router.route('/cart').get(getCart).post(addToCart)

module.exports = router