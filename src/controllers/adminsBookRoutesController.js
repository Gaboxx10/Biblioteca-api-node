//models
import Loans from "../models/loans.js";
import Book from "../models/books.js";
import User from "../models/user.js";

//POST: crear nuevos libros
export const newBook = async (req, res) => {
    const { name, author, description, genre } = req.body
    if(! name || !author || !description || !genre ) return res.status(400).json({message:"Los campos son obligatorios"})
    
    try {
        //console.log("test 1")
        const libraryBook = await Book.findOne({ name })
        if(libraryBook){
            const librayBookName = libraryBook.name
            const libraryBookAuthor = libraryBook.author
            if(librayBookName == name && libraryBookAuthor == author){
            return res.status(400).json({message: "Libro existente"})
        }
        //console.log("test 2")
        }
    } catch (error) {
        return res.status(400).json({message : error.message})
    }
    //console.log("test 3")
    const book = new Book({
        name,
        author,
        description,
        genre,
        status: "Disponible"
        })

    try {
        const save = await book.save()
        res.status(201).json({book})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

//PATCH: editar libros
export const editBook = async (req, res) => {
    const { name } = req.params
    if(!name) return res.status(400).json({message: "Se requiere el nombre del Libro"}) 
    if(!req.body.name && !req.body.author && !req.body.description && !req.body.genre) return res.status(400).json({message: "Debe colocar al menos un campo a modificar"}) 
    
    try {
        const libraryBook = await Book.findOne({ name })
        if(!libraryBook) return res.status(400).json({message: "El libro que desea modificar no existe"})

        const bookName = libraryBook.name
        const bookAuthor = libraryBook.author
        const bookDescription = libraryBook.description

        if(req.body.name === bookName) return res.status(400).json({message: "No hay cambios"})
        if(req.body.author === bookAuthor) return res.status(400).json({message: "No hay cambios"})
        if(req.body.description === bookDescription) return res.status(400).json({message: "No hay cambios"})

        libraryBook.name = req.body.name || libraryBook.name;
        libraryBook.author = req.body.author || libraryBook.author;
        libraryBook.description = req.body.description || libraryBook.description;
        libraryBook.genre = req.body.genre || libraryBook.genre;

        const update = await libraryBook.save()
        const book = name

        const loansBook = await Loans.findOne({book})
        if(loansBook){
            loansBook.book = req.body.name || loansBook.book;
            loansBook.info.name = req.body.name || loansBook.info.name;
            loansBook.info.author = req.body.author || loansBook.info.author;
            loansBook.info.description = req.body.description || loansBook.info.description;
            loansBook.info.genre = req.body.genre || loansBook.info.genre;  
            const loanBookUpdate = await loansBook.save()

            const email = loansBook.user.email
            if(!email) return res.status(500).json({message: "Error de modificación"})
            const user = await User.findOne({email})
            if(!email) return res.status(500).json({message: "Error de modificación"})
            if(user.books.includes(book) === true){
                const index = user.books.indexOf(book)
                user.books[index] = req.body.name
                try {
                    const userLoanBookUpdate = await user.save()
                } catch (error) {
                    return res.status(500).json({message:error.message})
                }
            }
        }
        res.status(201).json(update)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
} 

//DELETE: eliminar un libro
export const deleteBook = async (req, res) => {
    const { name } = req.params
    if(!name) return res.status(400).json({message:"Se requiere el nombre del libro"})
    let book;
    try {
        const libraryBook = await Book.findOne({ name })
        if(!libraryBook) res.status(400).json({message:"Libro no encontrado"})
        await libraryBook.deleteOne({ name })
        book = libraryBook.name
        const loansBook = await Loans.findOne({ book })
        if(loansBook){
            await loansBook.deleteOne({ book })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }

    res.status(200).json({message: book + " se eliminó correctamente"})
}




