import User from "../models/user.js"

const checkEmailDB = async(req, res, next) => {
    const { email } = req.body

    let user;
    
    try {
        user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Usuario Existente"}) 
        next()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export default checkEmailDB