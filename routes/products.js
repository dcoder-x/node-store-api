const express = require('express')
const router = express.Router()
const {getAllproducts,getProduct,addProduct,updateProduct,deleteProduct}=require('../controllers/products')

router.route('/').get(getAllproducts).post(addProduct).patch(updateProduct).delete(deleteProduct)
router.route('/filter').get(getProduct)

module.exports = router