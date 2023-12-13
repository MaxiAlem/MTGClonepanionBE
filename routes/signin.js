import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from "../models/User.js";


dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY 


const signRouter = Router();


signRouter.post('/signin', async(req,res)=>{
    
    const {name,email,password} = req.body

    try{
        const hashedPassword = await bcrypt.hash(password,8)
        const emailInDB = await User.findOne({email});
        const nameInDB = await User.findOne({name});

        if(emailInDB){
            res.status(401).json({message: 'email ya registrado'});

        }else if(nameInDB){
            res.status(401).json({message: 'nickname ya registrado'});
        }else {
            const newUser = new User({name, email, password: hashedPassword})

        await newUser.save()
        //console.log(newUser._id)
        const token = jwt.sign({userId: newUser._id},SECRET_KEY)

        res.status(201).json(newUser)
        }
    }catch(error){
        console.error('Error al agregar al usuario:', error);
        res.status(500).json({ error : 'Error al agregar al usuario'})
    }
})


export default signRouter