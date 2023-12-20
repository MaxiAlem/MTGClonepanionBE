import mongoose from "mongoose";
import Deck from './Deck.js';

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
    decks:[
        { type: mongoose.Schema.Types.ObjectId,
         ref: 'Deck' }
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