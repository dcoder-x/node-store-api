require('dotenv').config()
const ConnectDB = require('./db/connect')
const routes = require('./routes/products')
//port


const start = async ()=>{
    try {
        await ConnectDB(process.env.MONGO_URI)

        console.log(`sucess db is connected`)
        app.listen(process.env.PORT,()=>{
            console.log(`server is listening on port ${process.env.PORT}`) 
        })
    } catch (error) {
        console.log(error)
    }
}

const express = require('express')
const app = express()
//middleware

const notFoundMiddleWare = require('./middleware/not-found')
const errorMiddleWare = require('./middleware/error-handler')
app.use(express.json())
app.use('/api/v1/store',routes)


app.get('/',(req,res)=>{
    res.send('<h1>Hello Store</h1>')
})

app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

start()