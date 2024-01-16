import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default: 'default.jpg'
    },
    communities:[
        { type: mongoose.Schema.Types.ObjectId,
         ref: 'Community' }
    ]
})



const User = mongoose.model('User', userSchema)

export default User