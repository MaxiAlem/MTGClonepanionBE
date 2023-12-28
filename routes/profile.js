import { Router } from "express";
import tokenVerif from "../middleware/tokenVerif.js";
import User from '../models/User.js'

const profileRouter = Router()


//midddle
profileRouter.use(tokenVerif);


profileRouter.get('/profile', async (req, res)=>{
    try {
         // Obtener el ID del usuario autenticado desde req.userId
    const user = await User.findById(req.userId)
                          .populate({
                            path:'decks',
                            select : 'name color'})

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Devolver los datos del perfil
      res.json({
        name: user.name,
        email: user.email,
        img: user.img,
        decks:user.decks,
        pvp: user.pvp,
        multiplayer: user.multiplayer

        // Agrega otros campos del perfil que desees devolver
      });
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});

profileRouter.put('/profile', async (req,res)=>{
    
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
      user.img =req.body.img|| user.img
      
     


      //save
      await user.save();

      res.json({message:'Update Success!!'})
  } catch (error) {
      console.error('Error to update', error)
      res.status(500).json({error:"Error to update"})
      
  }
})
export default profileRouter