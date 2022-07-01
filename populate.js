require('dotenv').config()
const ConnectDB = require('./db/connect')
const Product = require('./models/product'),
jsonProducts = require('./products.json')


//port


const start = async ()=>{
    try {
        await ConnectDB(process.env.MONGO_URI)
        await Product.create(jsonProducts)
        console.log('success')
    } catch (error) {
        console.log(error)
    }
}

start()