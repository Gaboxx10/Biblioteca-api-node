//models
import User from "../models/user.js";
import Loans from "../models/loans.js";
import Book from "../models/books.js";

//services
import decodedToken from "../services/decodedToken.js";
import { hashPassword, hashCompare} from "../services/passwordService.js";
import { generateToken } from "../services/tokenService.js";

//GET: Obtener detalles de cuenta
export const myAccount = async (req, res) => {
    const { authorization } = req.headers
    const decoded = decodedToken(authorization)
    const { userName, userId } = decoded 
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(500).json({message : "Error de sesión"})
        const { id, email, books, reads, role } = user
        if(email !== userName || id !== userId) res.status(500).json({message : "Error de sesión"})
        const account = {
            email: email,
            role: role,
            books: books,
            reads: reads
        }
        res.status(200).json(account)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//PATCH: cambiar correo
export const changeEmail = async (req, res) => {
    const { authorization } = req.headers
    const decoded = decodedToken(authorization)
    const { userName, userId } = decoded 
    const { email } = req.body
    
    if(email === userName) return res.status(400).json({message: "Ya usas este Email"})

    let token;

    try {
        const user = await User.findById(userId)
        if(!user) res.status(500).json({message : "Error de sesión"})
        user.email = email || user.email;
        const loan = user.books
        if(loan.length !== 0){
            const emailLoanUpdate = loan.forEach(async book => {
            const loanBook = await Loans.findOne({book})
                loanBook.user.email = email 
                const update = await loanBook.save()
                })
            }
        const update = await user.save()
        token = await generateToken(user)
        res.status(201).json({message: "Cambio de Email realizado exitosamente", token})
    } catch (error) {
        res.status(500).json({message : error.message })
    }

}

//PATCH: cambiar contraseña
export const changePassword = async (req, res) => {
    const { authorization } = req.headers
    const decoded = decodedToken(authorization)
    const { userId, userName } = decoded
    const { password } = req.body

    try {
        const user = await User.findById(userId)
        if(!user) return res.status(500).json({message : "Error de sesión"})
        //console.log("test 1")
        try {
            const newPwd = await hashPassword(password)
            const oldPwd = user.password
            const compareNewPwd = await hashCompare(password, newPwd)
            const compareOldPwd = await hashCompare(password, oldPwd)
            if(compareNewPwd === true && compareOldPwd === true) res.status(400).json({message: "Ya usas esta Contraseña"})
            user.password = newPwd
            console.log("Nueva contraseña ", newPwd)
        } catch (error) {
            res.status(500).json({message : error.message})
        }
        const pwdUpdate = await user.save()
        res.status(201).json({message: "Contraseña cambiada"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//PATCH: cambiar rol
export const changeRole = async (req, res) => {
    const { authorization } = req.headers
    const { role } = req.body
    const decoded = decodedToken(authorization)
    const { userId, userName } = decoded

    if(!role) return res.status(400).json({message: "Debe colocarse un rol"})
    
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(500).json({message : "Error de sesión"})
        const userRole = user.role
        const min = role.toLowerCase()
        if(userRole == "Admin" && min == "admin" ){
            res.status(400).json({message: "Ya eres Admin"})
        }
        if(userRole == "User" && min == "user" ){
            res.status(400).json({message: "Ya eres Usuario"})
        }

        if(min === "admin"){
            res.status(403).json({message: "Forbidden"})
        }else{
            user.role = "User"
            const update = await user.save()
            res.status(201).json({message: "Ahora eres Usuario"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }




}

//DELETE: eliminar cuenta
export const deleteAccount = async (req, res) => {
    const { authorization } = req.headers
    const decoded = decodedToken(authorization)
    const { userId, userName } = decoded
    const { password } = req.body
    if(!password) return res.status(400).json({message : "Se requiere contraseña"})

    try {
        const user = await User.findById(userId)
        if(!user) return res.status(500).json({message : "Error de sesión"})
        const { books } = user
        const pwdMatch = await hashCompare(password, user.password)
        if(!pwdMatch) return res.status(400).json({message: "Contraseña incorrecta"}) 
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
        }
        await user.deleteOne({ user })
        res.status(200).json({message: "Cuenta eliminada"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}