import { cookies } from "next/headers"
import { verifyJwt } from "./token"

export const setSession = (data: any) => {
    const expires = new Date(Date.now() * 12 * 60 * 60 * 1000)
    cookies().set("session", data, {expires, httpOnly: true})
}

export const getSession = () => {
    const session = cookies().get("session")?.value
    if (!session) return null
    const payload = verifyJwt(session)
    return payload
}

export const removeSession = () => {
    cookies().set("session", '', {expires: new Date(0)})
}