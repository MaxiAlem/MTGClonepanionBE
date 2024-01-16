import mongoose from "mongoose";
import Deck from './Deck.js';

const playerSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
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

const Player = mongoose.model('Player',playerSchema);

export default Player