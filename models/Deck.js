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
    playedgames:{
        type:Number,
        default: 0
    }

})

const Deck = mongoose.model('Deck', deckSchema)


export default Deck