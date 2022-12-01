const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    sellerName:{
        type: String,
        required:[true, 'please fill out this filed']
    },
    sellerPassword:{
        type: String,
        required:[true, 'please fill out this filed']
    },
    sellerEmail:{
        type: String,
        required:[true, 'please fill out this filed']
    },
    sellerImage:{
        type:String,
    },
})

module.exports = mongoose.model('Seller',sellerSchema)