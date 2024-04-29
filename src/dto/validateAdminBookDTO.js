import Ajv from "ajv";
import addErrors from "ajv-errors";
import { Optional, String, Type } from "@sinclair/typebox";

//config typeBox
import { TypeSystemPolicy } from "@sinclair/typebox/system";
TypeSystemPolicy.ExactOptionalPropertyTypes = true


//Esquemas

//nuevo libro
const newBookDTO = Type.Object({
    name: Type.String({
        errorMessage:{
            type: "Name debe ser un String"
        }
    }),
    author: Type.String({
        errorMessage:{
            type: "Author debe ser un String"
        }
    }),
    description: Type.String({
        errorMessage:{
            type: "Description debe ser un String"
        }
    }),
    genre: Type.Array(
        Type.String({
            errorMessage:{
                type: "Genre debe ser un array de Strings"
            }
    })
    )
    },
    {
        additionalProperties: false,
        errorMessage:{
            additionalProperties: "Body no válido"
        }
    })

//modificar libro
const editBookDTO = Type.Object({
    name: Type.Optional(
        Type.String({
            errorMessage:{
                type: "Name debe ser un String"
            }
        })
    ),
    author: Type.Optional(
        Type.String({
            errorMessage:{
                type: "Author debe ser un String"
            }
        })
    ),
    description: Type.Optional(
        Type.String({
            errorMessage:{
                type: "Description debe ser un String"
            }
        })
    ),
    genre: Type.Optional(
        Type.Array(
            Type.String({
                errorMessage:{
                    type: "Genre debe ser un Array de Strings"
                }
        })
        )
    )
    },
    {
        additionalProperties: false,
        errorMessage:{
            additionalProperties: "Body no válido"
        }
    })

//ajv
const ajv = new Ajv({allErrors:true})
addErrors(ajv).addKeyword("kind").addKeyword("modifier");

//compilador
const newBookDTOSchema = ajv.compile(newBookDTO)
const editBookDTOSchema = ajv.compile(editBookDTO)

//middlewares
export const validateNewBookDTO = (req, res, next) => {
    const isValidDTO = newBookDTOSchema(req.body)
    if(!isValidDTO) return res.status(400).send(ajv.errorsText(newBookDTOSchema.errors))
    next()
}

export const validateEditBook = (req, res, next) => {
    const isValidDTO = editBookDTOSchema(req.body)
    if(!isValidDTO) return res.status(400).send(ajv.errorsText(editBookDTOSchema.errors))
    next()
}

