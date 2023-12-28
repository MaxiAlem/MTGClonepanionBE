import {Router} from 'express';
import tokenVerif from '../middleware/tokenVerif.js'

import User from '../models/User.js';
import Deck from '../models/Deck.js'

const deckRouter = Router();

//aplicamos el middlew para manipular la bd del user
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
    
    const newDeck = new Deck({name, color, owner: user._id})//creamos el mazo 

    await newDeck.save()//y lo saveamos
    ////////hay que guardar el id del deck en el usuario!!
    user.decks.push(newDeck._id)

    await user.save()

    res.status(201).json(newDeck)
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

    } catch (error) {
        console.error('Error al crear el mazo:', error);
    res.status(500).json({ error: 'Error al crear el mazo' });
    }

    });
deckRouter.put('/profile/decks', async (req, res)=>{
    const deck = await Deck.findById(req.body.deckId);

    const {name,color} = req.body

    try {
        //buscar el usuario en la bd ppor la id
  
        if(!deck){
            return res.status(404)
                      .json({message: 'dont found deck'})
        }
  
        //UPDATE DATA
        deck.name = req.body.name || deck.name
        deck.color = req.body.color || deck.color

        //save
        await deck.save();
  
        res.json({message:'Update Success!!'})
    } catch (error) {
        console.error('Error to update', error)
        res.status(500).json({error:"Error to update"})
        
    }
})
deckRouter.delete('/profile/decks', async (req,res)=>{
    const deck = await Deck.findById(req.body.deckId);
    const user = await User.findById(req.userId);

    if(!deck){
       return res.status(404).json({message:'Deck not found'})
    }
    if(!user.decks.includes(deck._id)){
        return res.status(404).json({message:'Deck not found in User'})
    }

    //borramos elemento de la bd
    await Deck.findByIdAndDelete(deck);//findByIdAndRemove no existe?

    // Elimina el ID del mazo del array de decks del usuario
    user.decks.pull(deck._id);

    // Guarda el usuario actualizado en la base de datos
    await user.save();
    res.send({message: "deck deleted successfully"})
})
   
export default deckRouter


///meter nombre del mazo y pushear en decks