import express from "express";

//controllers
import { getAllBooks, getBookByName, getBookByGenre, getBooksAvailable, orderBook, returnBook} from "../controllers/userBookRoutesController.js";

//middlewares
import validateToken from "../middlewares/validateToken.js"

//dto
import { validateOrderDTO, validateReturnDTO} from "../dto/validateUserBookDTO.js"

const Router = express.Router()

Router.get("/", validateToken, getAllBooks)
Router.get("/book/name/:name", validateToken, getBookByName)
Router.get("/book/genre/:genre", validateToken, getBookByGenre)
Router.get("/books/available", validateToken, getBooksAvailable)
Router.post("/order", validateToken, validateOrderDTO, orderBook)
Router.post("/return", validateToken, validateReturnDTO, returnBook)

export default Router















