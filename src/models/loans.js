import mongoose from "mongoose";

const { Schema } = mongoose

const loanSchema = new Schema(
    {
    book: String,
    user: {
        email: String,
        id: String
    },
    info:{
        _id: String,
        name: String,
        author: String,
        description: String,
        genre: [String]
        }
    }
)

export default mongoose.model("Loans", loanSchema)

