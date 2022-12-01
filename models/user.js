const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'please fill out this filed'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'please fill out this filed'],
    },
    email:{
        type: String,
        required:[true, 'please fill out this filed'],
        unique:true
    },
    profileImage:{
        type:String,     
    },
    cart:{
        type:Array,
        default:[]
    },
    favorites:{
        type:Array,
        default:[]
    }

})

module.exports= mongoose.model('User',userSchema)