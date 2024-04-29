import mongoose from "mongoose";

const { Schema } = mongoose

const bookSchema = new Schema(
    {
    name: String,
    author: String,
    description: String,
    genre: [String],
    status: String
    }
)

export default mongoose.model("Book", bookSchema)












