import {Router} from 'express';
import tokenVerif from '../middleware/tokenVerif.js';


import User from '../models/User.js';
import Comunnity from '../models/Comunnity.js'

const communityRouter = Router()

//middle para verif quien esta autenticado
communityRouter.use(tokenVerif)


communityRouter.get('/profile/communities', async(req,res)=>{
    try {
        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).json({ message : 'User not found'})
        };
        res.json({
            communities : user.communities
            })
        
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
   res.status(500).json({ error: 'Error al obtener el perfil' });
    }
})

communityRouter.post('/profile/communities', async(req,res)=>{

    const {name} = req.body;

    try {
        
        const user = await User.findById(req.userId);

        const newComm = new Comunnity({name, owner: user._id})//cramos la comm

        await newComm.save()//saveamos en la DB
        user.communities.push(newComm._id) //y en el arr del user

        res.status(201).json(newComm)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
    } catch (error) {
        console.error('Error creating community:', error);
        res.status(500).json({ error: 'Error creating community' });
        };

})

communityRouter.put('/profile/communities', async(req,res)=>{})

communityRouter.delete('/profile/communities', async(req,res)=>{})

export default communityRouter