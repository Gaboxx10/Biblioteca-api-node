import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv"; config()

const JWT_SECRET = process.env.JWT_SECRET

const validateToken = (req, res, next) => {
    const { authorization } = req.headers
    const auth = authorization
    const token = auth.split(" ")[1];

    console.log(token)
    if(!token) return res.status(401).json({message: "No autorizado"})
    
    const jwtDecoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).json({error: "Forbidden"})
        }
        //const userName = decoded.email
        next()
    })
    
}

//console.log(JWT_SECRET)

export default validateToken