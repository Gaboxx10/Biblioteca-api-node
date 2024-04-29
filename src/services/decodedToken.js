import express from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv"; config()

const JWT_SECRET = process.env.JWT_SECRET

const decodedToken = (auth) => {
    const bearerToken = auth
    const token = bearerToken.split(" ")[1];

    let data;
    const jwtDecoded = jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(500).json({error: "Eror de decodificación"})
        }
        
        data = {
            userName : decoded.email,
            userId : decoded.userId
        }
        //console.log(data.userName, data.userId)
    })
    return data
    
}

//console.log(JWT_SECRET)

export default decodedToken