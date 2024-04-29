import jwt from "jsonwebtoken";
import { config } from "dotenv"; config()

const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = async (user) => {
    return jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {expiresIn: "24h"})
}
