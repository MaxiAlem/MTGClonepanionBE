import mongoose from "mongoose";

const community = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    members:[{
        //armar coso de usuariosID
    }],
    sharedDecks:{
        type:Boolean,
        default:false
    }
})