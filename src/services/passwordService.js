import bcrypt from "bcrypt";

const SALT_ROUNDS = 10

//hasheador
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

//comparador
export const hashCompare = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}