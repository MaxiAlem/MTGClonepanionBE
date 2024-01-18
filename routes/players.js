import {Router} from 'express';
import tokenVerif from '../middleware/tokenVerif.js';


import User from '../models/User.js';
import Community from '../models/Community.js'
import Players from '../models/Players.js'


const playerRouter = Router()

playerRouter.use(tokenVerif)


playerRouter.get('/community/:commId/players', (req,res)=>{


})

playerRouter.post('/community/:commId/players', (req,res)=>{


})
playerRouter.put('/community/:commId/players', (req,res)=>{


})
playerRouter.delete('/community/:commId/players', (req,res)=>{


})



export default playerRouter