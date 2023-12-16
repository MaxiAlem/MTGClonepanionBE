import { Router } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import User from "../models/User.js";
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY 


const loginRouter = Router();

loginRouter.post('/login', async (req,res)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:'need a email and password to login'})
    }

    try {
        const user = await User.findOne({email});

        if (user){
            const passwordMatch = await bcrypt.compare(password, user.password)

            if(passwordMatch){
                const token = jwt.sign({userId: user._id},SECRET_KEY )


                res.header('authorization',token).json({message:'login success'})
            }else{
                res.status(401).json({ message : 'credenciales inválidas'})
            }
        }else{
            res.status(401).json({ message : 'email no registrado'})
        }
    } catch (error) {
        console.error('Error al logear', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
})


export default loginRouter