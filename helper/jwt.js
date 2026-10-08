import jwt from "jsonwebtoken"

const secret = "kesy ho bhayya"

export function gen_token(email){
   return jwt.sign(email,secret)
}

export function verify_token(token){
    return jwt.verify(token,secret)
}

