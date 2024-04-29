import express from "express";

//controllers
import { getAllLoans, getAllUsers, getUserByEmail, getLoanByBook, giveRole, banUser} from "../controllers/adminGestionRoutesController.js";

//middlewares
import validateRole from "../middlewares/validateRole.js";
import validateToken from "../middlewares/validateToken.js";

//dto
import { validateadminGiveRoleDTO } from "../dto/validateAdminGiveRole.js"

const Router = express.Router()

//users 
Router.get("/users", validateToken, validateRole, getAllUsers)
Router.get("/users/seach/:email", validateToken, validateRole, getUserByEmail)
Router.patch("/users/give-role/:email", validateToken, validateadminGiveRoleDTO, validateRole, giveRole)
Router.delete("/users/ban/:email", validateToken, validateRole, banUser )

//loans
Router.get("/loans", validateToken, validateRole, getAllLoans)
Router.get("/loans/seach/:name", validateToken, validateRole, getLoanByBook)



export default Router