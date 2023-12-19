import express from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import db from './config/db.js'

//db

//rutas
import loginRouter from './routes/login.js';
import signRouter from './routes/signin.js';
import profileRouter from './routes/profile.js';
import updateProfileRouter from './routes/updateProfile.js'

dotenv.config()
const PORT = process.env.PORT || 3000


const expressApp = express()

//middleWare
expressApp.use(express.json())
expressApp.use(bodyParser.json())

//def de modelo
const Todo = mongoose.model('Users', { text: String});


//obtener usuarios
expressApp.get('/todos', async(req,res)=>{
    try {
        const todos = await Todo.find()
        res.json(todos);
    } catch (e) {
        res.status(500).json({error: 'Error al obtener elementos'})
    }
})

//login
expressApp.use('/',loginRouter)
//registro
expressApp.use('/',signRouter)
//ver datos de usuario verificado
expressApp.use('/', profileRouter)
//update
expressApp.use('/', updateProfileRouter)

//crear mazo
//ver mazos



expressApp.get('/',(req,res)=>{
    return res.send('Hello there')
    
})

expressApp.listen(3000, ()=>{
    console.log(`server on in port ${PORT}`)
})