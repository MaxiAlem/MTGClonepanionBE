import {Router} from 'express';

import tokenVerif from '../middleware/tokenVerif.js';
import User from '../models/User.js'


const updateProfileRouter = Router();

//aplicamos el middle
updateProfileRouter.use(tokenVerif)

updateProfileRouter.put('/profile', async (req,res)=>{
    
    const userId = req.userId;
    

    try {
        //buscar el usuario en la bd ppor la id
        const user = await User.findById(userId)

        if(!user){
            return res.status(404)
                      .json({message: 'dont found User'})
        }

        //UPDATE DATA
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        //save
        await user.save();

        res.json({message:'Update Success!!'})
    } catch (error) {
        console.error('Error to update', error)
        res.status(500).json({error:"Error to update"})
        
    }
})

export default updateProfileRouter