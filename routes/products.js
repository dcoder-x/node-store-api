const express = require('express')
const router = express.Router()
const {getAllproducts,getProduct,addProduct,updateProduct,deleteProduct}=require('../controllers/products')

router.route('/').get(getAllproducts).post(addProduct)
router.route('/').get(getProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router