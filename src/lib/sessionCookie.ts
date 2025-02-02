import { cookies } from "next/headers"
import { verifyJwt } from "./token"
import { JwtPayload } from "jsonwebtoken"

interface jwtPayload extends JwtPayload {
    username: string
}

export const setSession = (data: any) => {
    const expires = new Date(Date.now() + 12 * 60 * 60 * 1000)
    cookies().set("session", data, {httpOnly: true, path: "/", expires})
}

export const getSession = async () => {
    const session = cookies().get("session")?.value
    if (!session) return null
    const payload = await verifyJwt(session)
    return payload as jwtPayload
}

export const removeSession = () => {
    cookies().set("session", '', {expires: new Date(0)})
}