import express from "express";

//models
import Book from "../models/books.js";
import Loans from "../models/loans.js";
import User from "../models/user.js";

//helpers
import decodedToken from "../services/decodedToken.js"
import { deleteBook , verifyRead } from "../helpers/userBookUpdatesofReturn.js";

//helpers
import orderArray from "../helpers/order.js";
import { contadorLibros } from "../helpers/contadores.js";

//GET: obtener todos los libros
export const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find()
        if(allBooks.length === 0) return res.status(404).json({message: "No hay libros"})
        const order = orderArray(allBooks)
        const all = contadorLibros(order) 
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//GET: obtener un libro por su nombre
export const getBookByName = async (req, res) => {
    const { name } = req.params
    if(!name) return res.status(400).json({message: "Se requiere el nombre del Libro"})
    
    try {
        const book = await Book.findOne({ name })
        if(!book) return res.status(404).json({message: "No encontrado"})
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
}

//GET: obtener libros de un genero específico
export const getBookByGenre = async (req, res) => {
    let { genre } = req.params
    if(!genre) return res.status(400).json({message: "Se requiere un género literario"})
    let booksGenre = []
    try {
        const allBooks = await Book.find()
        if(allBooks.length === 0) return res.status(404).json({message: "No hay libros"})
        const bookByGenre = allBooks.forEach(book => {
            //console.log("test 1")
            let arrayGenre = book.genre
            //console.log(arrayGenre)
            let getGenre = arrayGenre.includes(genre)
            if(getGenre == true){
                booksGenre.push(book)
            }
        })
        const order = orderArray(booksGenre)
        const all = contadorLibros(order)
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
} 

//GET: obtener solo libros disponibles
export const getBooksAvailable = async (req, res) => {
    try {
        const available = await Book.find({status: "Disponible"})
        if(available.length === 0) return res.status(404).json({message: "No hay libros disponibles"})
        const order = orderArray(available)
        const all = contadorLibros(order)
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//POST: pedir un libro
export const orderBook = async (req, res) => {
    const { name } = req.body 
    const { authorization } = req.headers
    if(!name) return res.status(400).json({message: "Se requiere el nombre del Libro"})
    const book = name
    try {
        const loansBook = await Loans.findOne({ book })
        if(loansBook) return res.status(404).json({message: "El libro que busca no está disponible en este momento"})        
        //console.log("Libro no presente en prestamos")        
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
    
    let info;

    try {
        const libraryBook = await Book.findOne({ name })
        if(!libraryBook) return res.status(404).json({message: "El libro que busca no está disponible"})
        info = libraryBook
    } catch (error) {
        return res.status(404).json({message : error.message})
    }

    const nameBook = info.name
    const id = info._id
    const { author, description, genre } = info
    const userData = decodedToken(authorization)
    if(!userData) return res.status(500).json({message: "Error de decodificación de data"})
    const { userId, userName } = userData


    const newOrder = new Loans ({
        book: nameBook,
        user: {
            email: userName,
            id: userId 
        },
        info:{
            _id: id,
            name: nameBook,
            author: author,
            description: description,
            genre: genre
            }
    })
    
    try {
        const newLoan = await newOrder.save()
        const libraryBook = await Book.findOne({ name })
        libraryBook.status = "No Disponible"
        const update = await libraryBook.save()

        let email = userName 
        const user = await User.findOne({email})
        if(!user) return res.status(500).json({message : error.message})
        user.books.push(info.name)
        const userBookUpdate = await user.save()
        
        res.status(201).json({message: "Prestamo realizado correctamente", book: nameBook})
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}

//POST: devolver libro
export const returnBook = async (req, res) => {
    const { name } = req.body 
    const { authorization } = req.headers
    if(!name) return res.status(400).json({message: "Se requiere el nombre del Libro"})
    const book = name

    let email

    try {
        const loansBook = await Loans.findOne({ book })
        if(!loansBook) return res.status(400).json({message:"No puedes devolver un libro que no posees"})
        const tokenData = decodedToken(authorization)
        if(!tokenData) return res.status(500).json({message: "Error de decodificación de data"})
        
        const { user } = loansBook
        const userId = user.id
        const userEmail = user.email

        const tokenId = tokenData.userId
        const tokenEmail = tokenData.userName

        if(userId === tokenId && userEmail === tokenEmail){
            await loansBook.deleteOne({name: loansBook.name})
            email = userEmail
        }else{
            return res.status(403).json({message: "No posees este libro"})
        }

    }catch(error){
        return res.status(404).json({message : error.message})
    }

    try {
        const libraryBook = await Book.findOne({ name })
        const nameBook = libraryBook.name
        libraryBook.status = "Disponible"
        const update = await libraryBook.save()

        const user = await User.findOne({ email })
        if(!user) return res.status(500).json({message : error.message})
        const userBooks = user.books
        const userReads = user.reads
        const booksUpdate = deleteBook(userBooks, nameBook)
        const readsUpdate = verifyRead(userReads, nameBook)
        user.books = booksUpdate
        user.reads = readsUpdate
        const userUpdate = await user.save()

        res.status(201).json({message: "Devolución realizada correctamente", book: nameBook})
    } catch (error) {
        res.status(500).json({message : error.message})
    }

}







