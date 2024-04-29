import mongoose from "mongoose";

const { Schema } = mongoose;

const Profile = new Schema({
    email: String,
    books: [String],
    reads: [String]
})