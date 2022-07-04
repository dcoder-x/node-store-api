const fs = require('fs');
const path = require('path');
const multer = require('multer');


const Product = require('../models/product')

const getAllproducts = async (req,res)=>{
    try {
        const products = await Product.find({}).sort({ratings:-1})
        console.log(products)
        res.send(products)
    } catch (error) {
        res.json(error)
    }

}
const getProduct = async (req,res)=>{
    try {
        const { name,field,brand,category,sort,minPrice,minRating,maxPrice,numericFilters} = req.query;
        //queryObjects
        const queryObjects={};
        if(name){
            queryObjects.name={$regex:name,$options:'i'}
        }
        if(numericFilters){
            const operatorMap={
                '>':'$gt',
                '>=':'$gte',
                '=':'$eq',
                '<=':'$lte',
                '<':'$lt',
            }
            const regEx= /\b(<|>|>=|=|<=)\b/g
            let filters = numericFilters.replace(
                regEx,
                (match)=> `-${operatorMap[match]}-`
            );
            const options= ['price','rating'];
            filters = filters.split(',').forEach(item => {
                const [field,operator,value] = item.split('-')
                if(options.includes(field)){
                    queryObjects[field] = {[operator]:Number(value)}
                }
            });
        }
        if(category){
            queryObjects.category={$regex:category,$options:'i'}
        }
        if(brand){
            queryObjects.brand={$regex:brand,$options:'i'}
        }
        if (minPrice||maxPrice) {
            queryObjects.price={$gte:Number(minPrice)||0,$lte:Number(maxPrice)||99999999999}
        }
        if(minRating){
            queryObjects.rating={$gte:Number(minRating)||0}
        }
        
        let result = Product.find(queryObjects)
        //sorting result 
        if(sort){
            const sortList = sort.split(',').join(' ')
            result = result.sort(sortList)
        }
        else{
            result = result.sort('rating')
        }
        //show specific fields
        if(field){
            const fieldList = field.split(',').join(' ')
            result = result.select(fieldList)
        }
        console.log(queryObjects)
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)
        const skip = (page-1)*limit
    
        result = result.skip(skip).limit(limit)
       const products =  await result
        res.send({data:products})
    } catch (error) {
        res.send(error)
    }
},
addProduct=async (req,res)=>{
    const storage = multer.diskStorage({
        destination: 'controllers/uploads',
        filename: (req, file, cb) => {
            cb(null, file.fieldname +Date.now()+'.jpg')
        },
        
    });
    
    const upload = multer({ storage: storage,  limits: {
        fieldNameSize: 300,
        fileSize: 5048579, // 5Mb
      }}).single('image');


      upload( req,res,async (err)=>{
        console.log(req.file)
        if (err) {
            res.status(401).send(err)
        }
        else{
            const product =req.body
            try {
                
                product.image= path.join(__dirname + '/uploads/' + req.file.filename)
                console.log(product)
               const newproduct =  await  Product.create(product)
               
                res.status(200).json({msg:'product added sucessfully',data:newproduct})
            } catch (error) {
                res.send(error)
            }
        }
    })

    
},

deleteProduct=async (req,res)=>{
    const {id}= req.params
    Product.deleteOne(id)
    
},
updateProduct=async (req,res)=>{
    const {id}= req.params
    Product.findByIdAndUpdate(id)

}

module.exports = {getAllproducts,updateProduct,addProduct,deleteProduct,getProduct}
