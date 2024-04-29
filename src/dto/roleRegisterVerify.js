const roleVerify = (role) => {
    let rol;
    if(!role){ 
        rol = "User" 
        return rol
    }

    const rolMin = role.toLowerCase()
    if(rolMin === "user"){
        rol = "User"
        return rol
    }else if(rolMin === "admin"){
        rol = "Admin"
        return rol
    }else{
        rol = "User"
        return rol
    }
}

export default roleVerify