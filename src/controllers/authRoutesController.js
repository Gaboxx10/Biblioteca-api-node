import express from "express";

//models
import User from "../models/user.js"

//services
import { hashPassword, hashCompare } from "../services/passwordService.js";
import { generateToken } from "../services/tokenService.js";

//helper
import roleVerify from "../dto/roleRegisterVerify.js";

export const register = async (req, res) => {
    const {email, password, role} = req.body
    const roleRegister = roleVerify(role)
    
    if(!email || !password) return res.status(400).json({message: "Los campos son obligatorios"})

    let hashedPass = "";

    try {
        const hashed = await hashPassword(password) 
        hashedPass = hashed
        //console.log("hash",hashed)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
    
    const user = new User({
        email,
        password : hashedPass,
        role: roleRegister
    })
    

    try {
        const newUser = await user.save()
        
        const token = await generateToken(user)
        //console.log("token", token)
        
        res.status(201).json({token})

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body

    let user;
    if(!email || !password) return res.status(400).json({message: "Los campos son obligatorios"})
    
    try {
        user = await User.findOne({email})
        if(!user) return res.status(404).json({message:"Usuario no encontrado"})
        
        const passwordMatch = await hashCompare(password, user.password)
        if(!passwordMatch) return res.status(401).json({error:"Usuario y contraseña no coinciden"})

        const token = await generateToken(user)
        res.status(200).json({token})

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}