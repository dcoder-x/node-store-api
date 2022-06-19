require('dotenv').config()
const ConnectDB = require('./db/connect')

const start = async ()=>{
    try {
        await ConnectDB(process.env.MONGO_URI)
        console.log('success')
    } catch (error) {
        console.log(error)
    }
}
start()
const express = require('express')
const app = express()
//middleware

const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')
app.use(express.json())

