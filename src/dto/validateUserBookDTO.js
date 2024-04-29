import Ajv from "ajv";
//import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { Type } from "@sinclair/typebox";

//Esquemas

//order book
const orderDTO = Type.Object({
    name: Type.String({
        errorMessage:{
            type: "Name debe ser un String"
        }
    },
    )
    },
    {
        additionalProperties: false,
        errorMessage:{
            additionalProperties: "Body no válido"
        }
    }
)

//return
const returnDTO = Type.Object({
    name: Type.String({
        errorMessage:{
            type: "Name debe ser un String"
        }
    },
    )
    },
    {
        additionalProperties: false,
        errorMessage:{
            additionalProperties: "Body no válido"
        }
    }
)


//ajv
const ajv = new Ajv({allErrors: true});
addErrors(ajv).addKeyword("kind").addKeyword("modifier")


//compilador DTO
const orderDTOSchema = ajv.compile(orderDTO)
const returnDTOSchema = ajv.compile(returnDTO)


//middleware

//order 
export const validateOrderDTO = (req, res, next) => {
    const isDTOvalid = orderDTOSchema(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(orderDTOSchema.errors))
    next()
}

//return
export const validateReturnDTO = (req, res, next) => {
    const isDTOvalid = returnDTOSchema(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(returnDTOSchema.errors))
    next()
}



