import express from "express";

//controllers
import { newBook, editBook, deleteBook } from "../controllers/adminsBookRoutesController.js";

//middlewares
import validateRole from "../middlewares/validateRole.js";
import validateToken from "../middlewares/validateToken.js";

//dto
import { validateNewBookDTO, validateEditBook } from "../dto/validateAdminBookDTO.js";

const Router = express.Router()

Router.post("/new-book", validateToken, validateNewBookDTO, validateRole,  newBook)
Router.patch("/edit-book/:name", validateToken, validateEditBook, validateRole, editBook)
Router.delete("/delete-book/:name", validateToken, validateRole, deleteBook)



export default Router





