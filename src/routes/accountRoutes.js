import express from "express";

//controllers
import { myAccount, changeEmail, changePassword, changeRole, deleteAccount } from "../controllers/accountRouterControllers.js";

//middlewares
import validateToken from "../middlewares/validateToken.js";
import validateUserAccount from "../middlewares/validateSelfUser.js";
import validateRegisterEmailDB from "../middlewares/validateRegisterEmailDB.js";

//dto
import { validateChangeEmailDTO, validateChangePwdDTO, validateChangeRoleDTO, validateDeleteAccountDTO } from "../dto/accountDTO.js"

const Router = express.Router()

Router.get("/my-profile", validateToken, validateUserAccount, myAccount)
Router.patch("/my-profile/config/change-email", validateToken, validateChangeEmailDTO, validateRegisterEmailDB, validateUserAccount, changeEmail)
Router.patch("/my-profile/config/change-role", validateToken, validateChangeRoleDTO, validateUserAccount, changeRole)
Router.patch("/my-profile/config/change-password", validateToken, validateChangePwdDTO, validateUserAccount, changePassword)
Router.delete("/my-profile/config/delete-account", validateToken, validateDeleteAccountDTO, validateUserAccount, deleteAccount)




export default Router