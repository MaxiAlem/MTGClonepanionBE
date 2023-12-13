import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.wlqpqoh.mongodb.net/`,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
})

const db = mongoose.connection

db.on('error',console.error.bind(console, 'Error de coneccion a mongo'))
    .once('open',()=>{
        console.log('Conexion exitosa al sv en mongo')
    })

export default db