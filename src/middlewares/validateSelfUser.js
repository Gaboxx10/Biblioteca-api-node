import User from "../models/user.js";
import decodedToken from "../services/decodedToken.js";

const validateUserAccount = async (req, res, next) => {
    const { authorization } = req.headers
    const decoded = decodedToken(authorization)
    const { userName, userId } = decoded 
    try {
        const user = await User.findById(userId)
        const { id, email } = user
        if(!user) return res.status(500).json({message : "Error de sesión"})
        if(email !== userName ) return res.status(500).json({message : "Error de sesión"})
        if(id !== userId ) return res.status(500).json({message : "Error de sesión"})
        next()
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    
}

export default validateUserAccount
