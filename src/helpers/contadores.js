export const contadorLibros = (array) => {
    const a = array
    const size = array.length
    if(size == 1){
        const message = {message: "Se encontró un libro"}
        a.unshift(message)
        return a
    }else{
        const message = {message: "Se encontraron " + size + " libros" }
        a.unshift(message)
        return a
    }
}

export const contadorUsuarios = (array) => {
    const a = array
    const size = array.length
    if(size == 1){
        const message = {message: "Se encontró un Usuario"}
        a.unshift(message)
        return a
    }else{
        const message = {message: "Se encontraron " + size + " Usuarios" }
        a.unshift(message)
        return a
    }
}

export const contadorPrestamos = (array) => {
    const a = array
    const size = array.length
    if(size == 1){
        const message = {message: "Se encontró un Préstamo"}
        a.unshift(message)
        return a
    }else{
        const message = {message: "Se encontraron " + size + " Préstamos" }
        a.unshift(message)
        return a
    }
}

