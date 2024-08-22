import { cookies } from "next/headers"

export const setSession = (data: any) => {
    const expires = new Date(Date.now() * 12 * 60 * 3600 * 1000)
    cookies().set("session", data, {expires, httpOnly: true})
}

export const getSession = () => {
    const session = cookies().get("session")?.value
    return (!session) ? null : session
}

export const removeSession = () => {
    cookies().set("session", '', {expires: new Date(0)})
}