import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY 


const tokenVerif = (req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message : 'token no proporcionado'})
    }

    jwt.verify(token,SECRET_KEY,(error,decoded)=>{
        if(error){
            return res.status(401).json({message: 'invalid Token'});
        }

        req.userId = decoded.userId
        next()
    
    });
}

export default tokenVerif