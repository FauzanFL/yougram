import db from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req: any) => {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const keyParam = searchParams.get("keyword")
    if (!keyParam) {
        return NextResponse.json({
            errors: {
                message: "Keyword not found"
            }
        }, {status: 400})
    }
    const keyword = keyParam.toString()
    try {
        const users = await db.user.findMany({where: {username: {contains: keyword}}})

        return NextResponse.json({
            data: users
        })
    } catch(e) {
        console.error(e)
        return NextResponse.json({
            errors: {
                message: "Internal Server Error"
            }
        }, {status: 500})
    }
}