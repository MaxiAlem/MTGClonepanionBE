import mongoose from "mongoose";

const deckSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required: true
    },
     img:{
        type:String,
        default: 'default.jpg'
    },
    color:[{
        type:String
    }],
    shared:{
        type:Boolean,
        default:false,
        required: true
    },
    win:{
        type:Number,
        default: 0
    },
    lose:{
        type:Number,
        default: 0
    },
    playedgames:{
        type:Number,
        default: 0
    }

})

const Deck = mongoose.model('Deck', deckSchema)


export default Deck