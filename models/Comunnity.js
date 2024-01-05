import mongoose from "mongoose";

const communitySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    members:[{
         type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            admin:{
                type:Boolean,
                default:false,
                required:true
            }}
    ],
    sharedDecks:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        default:'default.jpg'
    },
    owner:[{
        type: mongoose.Schema.Types.ObjectId,
           ref: 'User',}
   ],
   events:[{
    
   }]
})

const Community = mongoose.model('Community', communitySchema)

export default Community