import {Router} from 'express';
import tokenVerif from '../middleware/tokenVerif.js';


import User from '../models/User.js';
import Community from '../models/Community.js'

const communityRouter = Router()

//middle para verif quien esta autenticado
communityRouter.use(tokenVerif)


communityRouter.get('/community/:commId', async(req,res)=>{
    try {
        const user = await User.findById(req.userId)
        const community = await Community.findById(req.params.commId)

        if(!user){
            return res.status(404).json({ message : 'User not found'})
        };
        if(!community.admins.includes(user._id)){    
           return res.json({
                message : `bienvenido a la comunidad ${community.name}, solicite una invitacion para ser admin`
            })
        } 
        res.json({
                message : `bienvenido a la comunidad ${community.name},${user.name}`,
                
            })
        
        
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
   res.status(500).json({ error: 'Error al obtener el perfil' });
    }
})
//add new comm
communityRouter.post('/profile', async(req,res)=>{

    const {nameComm} = req.body;

    try {
        
        const user = await User.findById(req.userId);

        if (!user) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }


        const newComm = new Community({name:nameComm, admins: [req.userId]})//cramos la comm

        await newComm.save()//saveamos en la DB
        user.communities.push(newComm._id) //y en el arr del user
        await user.save()

        res.status(201).json(newComm)

      
    } catch (error) {
        console.error('Error creating community:', error);
        res.status(500).json({ error: 'Error creating community' });
        };

})

communityRouter.put('/community/:commId', async(req,res)=>{
    //editar nombre, foto

  
  try {
      //buscar el usuario en la bd por la id
      const user = await User.findById(req.userId)
      const community = await Community.findById(req.params.commId)

      if(!user){
          return res.status(404)
                    .json({message: 'dont found User'})
      }
      if(!community.admins.includes(user._id)){    
        return res.json({
             message : `bienvenido a la comunidad ${community.name}, solicite una invitacion para ser admin`
         })
     } 

      //UPDATE DATA
      community.name = req.body.name || community.name
      
      community.img =req.body.img|| community.img

      //save
      await community.save();

      res.json({message:'Update Success!!'})
  } catch (error) {
      console.error('Error to update', error)
      res.status(500).json({error:"Error to update"})
      
  }
})

communityRouter.delete('/community/:commId', async(req,res)=>{

    //borrar comunidad
    //si una comm no tiene admins, se borra
    const userId = req.userId;
   

  try {
    //buscar el usuario en la bd por la id
    const user = await User.findByIdAndDelete(userId)
    const community = await Community.findByIdAndDelete(req.params.commId)
    if(!user){
        return res.status(404)
                  .json({message: 'dont found User'})
    }
    if(!community.admins.includes(user._id)){    
        return res.json({
             message : `bienvenido a la comunidad ${community.name}, solicite una invitacion para ser admin`
         })
     } 

    res.json({message:'delete Success!!'})
} catch (error) {
    console.error('Error to delete', error)
    res.status(500).json({error:"Error to delete"})
    
}
})

export default communityRouter