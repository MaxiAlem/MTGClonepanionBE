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
        type:String
    },
    decks:[
        {type:String}
    ],
    pvp:[{
        win:{
            type:Number
        },
        lose:{
            type:Number
        }
    }],
    multiplayer:[{
        win:{
            type:Number
        },
        lose:{
            type:Number
        }
    }],
})



const User = mongoose.model('User', userSchema)

export default User