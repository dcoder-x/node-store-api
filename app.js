require('dotenv').config()
const ConnectDB = require('./db/connect')
const routes = require('./routes/products')

//port


const start = async ()=>{
    try {
        await ConnectDB('mongodb+srv://Ayomikun:response@cluster0.bfkxf.mongodb.net/store-api?retryWrites=true&w=majority')

        console.log(`sucess db is connected`)
        app.listen(process.env.PORT,()=>{
            console.log(`server is listening on port ${process.env.PORT}`) 
        })
    } catch (error) {
        res.send(error)
    }
}

const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
//middleware
app.use(express.urlencoded({extended:false}))
const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')
app.use(express.json())
app.use('/api/v1/store',routes)


app.get('/',(req,res)=>{
    res.json({msg:'you are in'})
})

app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

start()


module.exports = app