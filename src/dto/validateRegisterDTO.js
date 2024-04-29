import { Optional,  Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

//models
import User from "../models/user.js";

//config typeBox
import { TypeSystemPolicy } from "@sinclair/typebox/system";
import { Value } from "@sinclair/typebox/value";


TypeSystemPolicy.ExactOptionalPropertyTypes = true



//esquema de validacion
const registerDTOschema = Type.Object({
        email: Type.String({
            format: "email",
            errorMessage:{
                type: "Email debe ser un String",
                format: "Email debe ser un correo electrónico"
            }
        }),
        password: Type.String({
            errorMessage:{
                type: "Password debe ser un String",
            }
        }),
        role: Type.Optional(
            Type.String({
                errorMessage:{
                    type: "Role debe ser un String"
                } 
            })
        ),
    },
    {
        additionalProperties: false,
        errorMessage:{
        additionalProperties: "Body no válido"
        }

    }
)

//clase ajv
const ajv = new Ajv({allErrors: true});
//fomatos
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier");
//errores
addErrors(ajv);

const validate = ajv.compile(registerDTOschema)

//middleware
const validateRegisterDTO = (req, res, next) => {
    const isDTOvalid = validate(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(validate.errors))
    
    next()
}


export default validateRegisterDTO