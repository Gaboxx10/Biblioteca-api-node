//models
import User from "../models/user.js";
import Loans from "../models/loans.js";
import Book from "../models/books.js";

//helpers
import roleVerify from "../dto/roleRegisterVerify.js"
import orderArray from "../helpers/order.js"
import { contadorPrestamos, contadorUsuarios } from "../helpers/contadores.js"

//GET: obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        if(allUsers.length === 0) return res.status(204).json({message: "No hay Usuarios"})
        let userObj;
        let usersList = []
        const desestructuringUser = allUsers.forEach(user => { 
            const { id, email, role, books, reads } = user
            userObj = { id:id, email: email, role: role, books: books, reads: reads }
            usersList.push(userObj)
        })
        const order = orderArray(usersList)
        const all = contadorUsuarios(order)
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}

//GET: obtener usurio por email
export const getUserByEmail = async (req, res) => {
    const { email } = req.params
    if(!email) return res.status(400).json({message: "Se requiere un Usuario"})
    try {
        const user = await User.findOne({ email })
        if(!user)  return res.status(404).json({message: "No Encontrado"})
        const userEmail = user.email
        const { id, role, books, reads } = user
        const userInfo = { id:id, email: userEmail, role: role, books: books, reads: reads }
        res.status(200).json(userInfo)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//GET: obtener todos los prestamos
export const getAllLoans = async (req, res) => {
    try {
        const allLoans = await Loans.find()
        if(allLoans.length === 0) return res.status(404).json({message: "No hay Prestamos"})
        let loanObj;
        let loanList = []
        const desestructuringLoans = allLoans.forEach(loan => { 
            const { user, info } = loan
            const { email } = user
            const { name, author, description, genre } = info
            loanObj = {
                book:{
                    name: name,
                    author: author,
                    description: description,
                    genre: genre
                },
                user: email
            }
            loanList.push(loanObj)
        })
        const all = contadorPrestamos(loanList) 
        res.status(200).json(loanList)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}

//GET: obtener prestamo de un libro específico
export const getLoanByBook = async (req, res) => {
    const { name } = req.params
    if(!name) return res.status(400).json({message: "Se requiere un Libro"})
    const book = name
    try {
        const loanBook = await Loans.findOne({ book })
        if(!loanBook) return res.status(404).json({message: "No encontrado en Prestamos"})
        let loanObj
        const { info, user } = loanBook
        const nameBook = loanBook.book
        const { email } = user
        const { author, description, genre } = info
        
        loanObj = {
            book:{
                name: nameBook,
                author: author,
                description: description,
                genre: genre
            },
            user: email
        }
        res.status(200).json(loanObj)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}//TODO

//PATCH: otorgar o quitar admin
export const giveRole = async (req, res) => {
    const { email } = req.params
    const { role } = req.body
    if(!email) return res.status(404).json({message: "Se requiere un Usuario"})
    if(!role) return res.status(404).json({message: "Se requiere un Rol"})
    const roleCheck = roleVerify(role)
    
    try {
        const user = await User.findOne({ email })
        if(!user)  return res.status(404).json({message: "No Encontrado"})
        if(user.role === "Admin") return res.status(403).json({message: "Forbidden"})
        if(user.role === roleCheck) return res.status(400).json({message: email + " ya es " + roleCheck})
        user.role = roleCheck
        const update = await user.save()
        res.status(201).json({message: email + " ahora es " + roleCheck})
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}

//DELETE: banear un usuario
export const banUser = async (req, res) => {
    const { email } = req.params
    if(!email) return res.status(400).json({message: "Se requiere un usuario"})
    try {
        const user = await User.findOne({ email })
        if(!user) return res.status(404).json({message: "No Encontrado"})
        const { role } = user
        if(role === "Admin") return res.status(403).json({message: "Forbidden"})
        const { books } = user

        let userLoans = false

        if(books.length !== 0){
            const loansUser = books.forEach( async loanBook => {
                const book = loanBook
                const loansBook = await Loans.findOne({ book })
                if(loansBook){
                    await loansBook.deleteOne({ book })
                }
                const name = loanBook
                const libraryBook = await Book.findOne({ name })
                libraryBook.status = "Disponible"
                const update = await libraryBook.save()
            })
            userLoans = true
        }
        await user.deleteOne({ user })
        
        if(userLoans == false){
            res.status(200).json({message: "El Usuario " + email + " ha sido baneado"})
        }else{
            res.status(200).json({message: "El Usuario " + email + " ha sido baneado y los libros que poseía han sido devueltos"})
        }

    } catch (error) {
        
    }
}
