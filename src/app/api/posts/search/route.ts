import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: any) {
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
        const posts = await db.post.findMany({where: {content: {contains: keyword}}, include: {user: true}})

        return NextResponse.json({
            data: posts
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