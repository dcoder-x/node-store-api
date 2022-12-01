const mongoose = require('mongoose'),

productSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Your product must have a name']
    },
    price:{
        type: Number,
        required: [true, 'Your product must have a price']
    },
    featured:{
        type: String,
        default:false
    },
    quantity:{
        type: Number,
        default:1
    },
    rating:{
        type: Number,
        default:0
    },
    category:{
        type: String,
        required: [true, 'Your product must have a category']
    },
    dateAdded:{
        type: Date,
        default: Date.now()
    },
    seller:{
        type: String,
        required: [true, 'sellerName must be provided']
    },
    sellerId:{
        type:String,
        required: [true, 'sellerId must be provided']
    },
    brand:{
        type: String,
    },
    image:{
        type: String,
        required: [true, 'Your product must have an image']
    }
})


module.exports = mongoose.model('Product',productSchema)