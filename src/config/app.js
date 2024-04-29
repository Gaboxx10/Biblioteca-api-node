import express from "express";
import bodyParser from "body-parser";


//registro y login
import authRoutes from "../routes/authRoutes.js";

//account
import accountRoutes from "../routes/accountRoutes.js"

//admin 
import adminGestionRoutes from "../routes/adminGestionRoutes.js";
import adminsBookRoutes from "../routes/adminsBookRoutes.js";

//user
import userBookRoutes from "../routes/userBookRoutes.js";


const APP = express()


APP.use(bodyParser.json())


//ROUTES


//registro y login
APP.use("/auth", authRoutes)

//account
APP.use("/account", accountRoutes)

//admin
APP.use("/library", adminsBookRoutes)
APP.use("/admin", adminGestionRoutes)

//user
APP.use("/library", userBookRoutes)


export default APP