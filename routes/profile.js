import { Router } from "express";
import tokenVerif from "../middleware/tokenVerif.js";
import User from '../models/User.js'

const profileRouter = Router()


//midddle
profileRouter.use(tokenVerif);


profileRouter.get('/profile', async (req, res)=>{
    try {
         // Obtener el ID del usuario autenticado desde req.userId
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Devolver los datos del perfil
      res.json({
        name: user.name,
        email: user.email,
        // Agrega otros campos del perfil que desees devolver
      });
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
    res.status(500).json({ error: 'Error al obtener el perfil' });
    }
});


export default profileRouter