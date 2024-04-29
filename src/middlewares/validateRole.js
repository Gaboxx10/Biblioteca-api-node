import decodedToken from "../services/decodedToken.js";
import User from "../models/user.js"

const validateRole = async (req, res, next) => {
    const { authorization } = req.headers
    const data = decodedToken(authorization)
    if(!data) return res.status(500).json({message: "Error de decodificación de data"})
    const { userName, userId } = data
    
    let roleVerify
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: error.message})
        roleVerify = user.role
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
    if(roleVerify === "User") return res.status(403).json({message: "Forbidden"})
    if(roleVerify === "Admin"){
        next()
    }
}

export default validateRole