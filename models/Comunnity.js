import mongoose from "mongoose";

const communitySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    members:[{
         type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }],
    decks: [{
         type: mongoose.Schema.Types.ObjectId,
            ref: 'Deck' 
    }],
    img:{
        type:String,
        default:'default.jpg'
    },
    admins:[{
        type: mongoose.Schema.Types.ObjectId,
           ref: 'User',}
   ],
   events:[{
    
   }]
})

const Community = mongoose.model('Community', communitySchema)

export default Community