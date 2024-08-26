import { sign, verify } from "jsonwebtoken"

const secret = process.env.JWT_SECRET ? (process.env.JWT_SECRET)?.toString() : "jwtsecretasfakjfwaoi"

export const signJwt =(payload: any) => {
    return sign(payload, secret, {expiresIn: "12h"})
}

export const verifyJwt = async (token: string) => {
    return await verify(token, secret)
}