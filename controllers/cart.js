const User = require("../models/user");


const getCart =(async (req,res)=>{
    try {
        if (!req.user) {
            res.status(400).json({msg:'please sign in'})
        }
        const {name} = req.user
        const user= await User.find({name:name})
        if(user){
            res.status(200).json({data:user.cart})
        }
    } catch (error) {
        res.status(400).json({msg:error})
    }

})

const addToCart =(async (req,res)=>{
    try {
        if (!req.user) {
            res.status(400).json({msg:'please sign in'})
        }
        const {name} = req.user
        const user= await User.find({name:name})
        if(user){
            const product = req.body
            if(product){
                user.cart.push(product)
                User.findOneAndUpdate({name:name},product,{new:true,runValidators:true})
            }
        }
    } catch (error) {
        res.status(400).json({msg:error})
    }

})

module.exports={getCart,addToCart}



