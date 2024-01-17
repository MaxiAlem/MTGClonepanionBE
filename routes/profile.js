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
    // //                       .populate({
    // //                         path:'decks',
    // //                         select : 'name color'})

    if (!user) {
        return res.status(404).json({ message: 'USER not Found' });
      }
  
      // Devolver los datos del perfil
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        img: user.img,
        communities:user.communities,
      

        // Agrega otros campos del perfil si los hay
      });
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error to get Profile' });
    }
});

profileRouter.put('/profile', async (req,res)=>{
    
  const userId = req.userId;
  

  try {
      //buscar el usuario en la bd por la id
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

profileRouter.delete('/profile', async(req,res)=>{
  const userId = req.userId;

  try {
    //buscar el usuario en la bd por la id
    const user = await User.findByIdAndDelete(userId)

    if(!user){
        return res.status(404)
                  .json({message: 'dont found User'})
    }

    res.json({message:'delete Success!!'})
} catch (error) {
    console.error('Error to delete', error)
    res.status(500).json({error:"Error to delete"})
    
}
})
export default profileRouter