import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const changeEmailDTO = Type.Object({
    email: Type.String({
        format: "email",
        errorMessage:{
            type: "Email debe ser un String"
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

const changePasswordDTO = Type.Object({
    password: Type.String({
        errorMessage:{
            type: "Password debe ser un String"
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

const changeRoleDTO = Type.Object({
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
const ajv = new Ajv({allErrors: true})
addFormats(ajv, ["email"]).addKeyword("kind").addKeyword("modifier")
addErrors(ajv)

//compilador
const changeEmailDTOSchema = ajv.compile(changeEmailDTO)
const changePasswordDTOSchema = ajv.compile(changePasswordDTO)
const changeRoleDTOSchema = ajv.compile(changeRoleDTO)
const deleteAccountDTOSchema = ajv.compile(changePasswordDTO)


//middlewares
export const validateChangeEmailDTO = (req, res, next) => {
    const isDTOvalid = changeEmailDTOSchema(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(changeEmailDTOSchema.errors))
    next()
}

export const validateChangePwdDTO = (req, res, next) => {
    const isDTOvalid = changePasswordDTOSchema(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(changePasswordDTOSchema.errors))
    next()
}

export const validateChangeRoleDTO = (req, res, next) => {
    const isDTOvalid = changeRoleDTOSchema(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(changeRoleDTOSchema.errors))
    next()
}

export const validateDeleteAccountDTO = (req, res, next) => {
    const isDTOvalid = deleteAccountDTOSchema(req.body)
    if(!isDTOvalid) return res.status(400).send(ajv.errorsText(deleteAccountDTOSchema.errors))
    next()
}











