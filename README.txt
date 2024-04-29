REGISTRO Y LOGIN

"/auth/register/": Registro

{
    "name": "fulano@dev.com",
    "password": "12345"
    "role": "Admin" o "User" (opcional, en caso de no
     llenar este campo se asignará "User" por defecto)
}


"//auth/login/": Login

{
    "name": "lapotranca@dev.com",
    "password": "12345"
}


***********************************************************

ACCOUNT

"/account/my-profile": Información de Perfil

"/account/my-profile/config/change-email": Cambio de email

{
    "email": "lapotranca@dev.com"
}

"/account/my-profile/config/change-role": Cambio de rol

{
    "role": "User"
}

"/account/my-profile/config/change-password": Cambio de password

{
    "password": "12345"
}

"/account/my-profile/config/delete-account"

{
    "password": "12345"
}

***********************************************************

USER 

"/library/": Obtener todos los libros

"/library/book/name/:name": Obtener libro por su nombre (req.params)

"/library/book/genre/:genre": Obtener libro por genero literario

"/library/books/available": Obtener libros disponibles

"library/order": Pedir prestado un libro

{
    "name": "Don Quijote"
}

"library/return": Devolver un libro

{
    "name": "Don Quijote"
}

***********************************************************

ADMIN 

"library/new-book": Añadir un libro nuevo a la biblioteca

{
      "name": "El señor de los anillos: La comunidad del anillo",
      "author": "J.R.R. Tolkien",
      "description": "Frodo Bolsón emprende un viaje para destruir un anillo maligno y enfrentarse al señor oscuro Sauron en la Tierra Media, junto a un grupo de compañeros leales.",
      "genre": ["Fantasía", "Aventura", "Épico"]
}

"library/edit-book/:name": Editar la información de un libro (req.params)

{
      "author": "J.R.R. Tolki..| ",
}

"library/delete-book/:name": Elimina un libro de la biblioteca

"admin/users": Obtener la lista de usuraios y su información

"admin/users/seach/:email": Obtener un usuario por su email (req.params)

"admin/users/give-role/:email": Dar el rol de Admin a un usuario

"admin/users/ban/:email": Banear un usuario

"admin/loans": Obtener lista de prestamos actuales

"admin/loans/seach/:name": Obtener lista de prestamos de un libro específico 











