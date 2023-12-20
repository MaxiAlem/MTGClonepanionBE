import {Router} from 'express';
import tokenVerif from '../middleware/tokenVerif.js'

import User from '../models/User.js';
import Deck from '../models/Deck.js'

const deckRouter = Router();

//aplicamos el middlew
deckRouter.use(tokenVerif)

deckRouter.get('/profile/decks',async (req,res)=>{
    try {
        // Obtener el ID del usuario autenticado desde req.userId
   const user = await User.findById(req.userId);

   if (!user) {
       return res.status(404).json({ message: 'Usuario no encontrado' });
     }

     res.json({
        decks: user.decks
     })

   } catch (error) {
       console.error('Error al obtener el perfil:', error);
   res.status(500).json({ error: 'Error al obtener el perfil' });
   }
   }
   
   );

deckRouter.post('/profile/decks',async (req,res)=>{

    const {name,color} = req.body

    try {
         // Obtener el ID del usuario autenticado desde req.userId
    const user = await User.findById(req.userId);
    
    const newDeck = new Deck({name, color, owner: user})//creamos el mazo 

    await newDeck.save()//y lo saveamos
    ////////hay que guardar el id del deck en el usuario!!

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

    } catch (error) {
        console.error('Error al crear el mazo:', error);
    res.status(500).json({ error: 'Error al crear el mazo' });
    }
   
    

    res.status(201).json(newUser)
    });


   
export default deckRouter
///meter nombre del mazo y pushear en decks