import mongoose from "mongoose";

//database
const connectDB = (url, name) => {
    try {
        mongoose.connect(url, {dbName: name})
        console.log("Database is connected")
    } catch (error) {
        return console.log("No se pudo conectar con la base de Datos")
    }
}


export default connectDB
