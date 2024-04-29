export const deleteBook = (arr, elemet) => {
    let array = arr
    let book = elemet
    let index
    const seach = array.includes(book)
    if(seach === true){
        index = array.indexOf(book)
    }else{
        return console.log("Error al eliminar elemento de array")
    }
    const deleteArray = array.splice(index, 1)
    return book = array
}

export const verifyRead = (arr, elemet) => {
    let array = arr
    let book = elemet
    let index
    const seach = array.includes(book)
    if(seach === true){
        return array
    }else{
        array.push(elemet)
        return array
    }
}
