console.clear()
import express from "express";
import APP from "./app.js"
import { config } from "dotenv"; config()
import connectDB from "./database.js"
import { Mongoose } from "mongoose";


//env
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const MONGO_DB_NAME = process.env.MONGO_DB_NAME

const init = () => {
    connectDB(MONGO_URL, MONGO_DB_NAME);
    
    APP.listen(PORT, (req, res) => {
        console.log("Server activo en el puert0:", PORT)
    })

}

init()