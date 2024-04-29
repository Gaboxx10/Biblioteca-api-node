import express from "express";

//controladores
import { register, login} from "../controllers/authRoutesController.js";

//DTOs
import validateRegisterDTO  from "../dto/validateRegisterDTO.js";
import validateLoginDTO from "../dto/validateLoginDTO.js";

//middleware
import checkEmailDB from "../middlewares/validateRegisterEmailDB.js";


const Router = express.Router()

Router.post("/register", validateRegisterDTO, checkEmailDB, register)
Router.post("/login", validateLoginDTO, login)

export default Router