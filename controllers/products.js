const getAllproducts =(req,res)=>{
    res.send('get all ')
},
getProduct=(req,res)=>{
    res.send('get')
},
addProduct=(req,res)=>{
    console.log('add')
},
deleteProduct=(req,res)=>{
    console.log('delete')
},
updateProduct=(req,res)=>{
    console.log('update')

}

module.exports = {getAllproducts,updateProduct,addProduct,deleteProduct,getProduct}
