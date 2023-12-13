import mongoose from "mongoose";

const deckSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    owner:{
        type:String
    },
    img,
    color:[{
        type:String
    }],
    win,lose,playedgames

})