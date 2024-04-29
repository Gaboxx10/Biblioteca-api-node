import mongoose from "mongoose";

const { Schema } = mongoose

const User = new Schema (
    {
    email: {type: String, require: true, unique:true},
    password: String,
    role: String,
    books:[String],
    reads: [String]
    }
)

export default mongoose.model("User", User);