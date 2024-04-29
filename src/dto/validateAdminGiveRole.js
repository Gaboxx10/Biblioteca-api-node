import Ajv from "ajv";
import addErrors from "ajv-errors";
import { Type } from "@sinclair/typebox";


const adminGiveRoleDTO = Type.Object({
    role: Type.String({
        errorMessage:{
            type: "Role debe ser un String"
        }
    })
    },
    {
        additionalProperties: false,
        errorMessage:{
            additionalProperties: "Body no válido"
        }
    }
)

//ajv
const ajv = new Ajv ({allErrors: true})
addErrors(ajv).addKeyword("kind").addKeyword("modifier")

//compilador
const adminGiveRoleDTOSchema = ajv.compile(adminGiveRoleDTO)

export const validateadminGiveRoleDTO = (req, res, next) => {
    const isValidDTO = adminGiveRoleDTOSchema(req.body)
    if(!isValidDTO) return res.status(400).send(ajv.errorsText(adminGiveRoleDTOSchema.errors))
    next()
}



