const verifyAdminRole = (rol) => {
    if(rol == "Admin"){
        return true
    }else{
        return false
    }
}

export default verifyAdminRole