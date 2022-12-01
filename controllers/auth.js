const Seller = require("../models/seller");
const User = require("../models/user");
const bcrypt= require('bcrypt')
const  jwt = require('jsonwebtoken');


const userSignup = async (req,res)=>{
    const userInfo = req.body
    const {name,email,password} = userInfo

    if(name&&email&&password){
        const hashedPassword= await bcrypt.hash(password,10)

        try {
            
            userInfo.password= hashedPassword
            console.log(userInfo)
            await User.create(userInfo)

            res.status(201).json({msg:'User account created'})
        } catch (error) {
            res.status(401).json({msg: 'something went wrong user not created successfully',error})
        }
    }
    else{
        res.status(401).json({msg:'fill out the necessary fields'})
    }
}

const userSignin = async (req,res)=>{
    const userInfo = req.body
    const {name,email,password} = userInfo

    if(name||email&&password){
        try {
            
           const user= await User.find({name:name})
           console.log(user)


           if (user) {
            console.log(user.password)
            const userValid = await bcrypt.compare(password,user[0].password)
              if (userValid) {
                console.log('gtg2')
                const id = user[0]._id
                console.log(id)
                const token= jwt.sign({id,name},process.env.SECRET_KEY,{
                    expiresIn: '30d',
                  })
               return res.status(201).json({msg: 'user logged in',token})
              }
              else{
                return res.status(401).json({msg: 'password incorrect'})
              }
           }
           res.status(404).json({msg:'user not found'})
        } catch (error) {
           return res.json({msg: 'something went wrong user not found',error})
        }
    }
    else{
        res.status(401).json({msg:'fill out the necessary fields'})
    }
}

const sellerSignup = async (req,res)=>{
    const sellerInfo = req.body
    const {sellerName,sellerEmail,sellerPassword} = sellerInfo

    if(sellerName&& sellerEmail&&sellerPassword){
        const hashedPassword= bcrypt.hash(sellerPassword,10)

        sellerPassword= hashedPassword
        
        try {
            await Seller.create(sellerInfo)
            res.status(201).json({msg:'Seller account created'})
        } catch (error) {
            res.status(401).json({msg: 'something went wrong user not created successfully'})
        }
    }
    else{
        res.status(401).json({msg:'fill out the necessary fields'})
    }
}

const sellerSignin = async (req,res)=>{
    const sellerInfo = req.body
    const {name,email,password} = sellerInfo

    if(name||email&&password){
        try {
           const seller= await Seller.find({name:name})

           if (seller) {
              if (await bcrypt.compare(password,seller.password)) {
                res.status(201).json({msg: 'seller logged in'})
              }
           } else {
                res.status(401).json({msg: 'password incorrect'})
           }
           res.status(404).json({msg:'seller not found'})
        } catch (error) {
            res.json({msg: 'something went wrong seller not created successfully'})
        }
    }
    else{
        res.status(401).json({msg:'fill out the necessary fields'})
    }
}


module.exports = {userSignin,userSignup,sellerSignin,sellerSignup}
