import db from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    const res = NextResponse
    try {
        const posts = await db.post.findMany({orderBy: {createdAt: "desc"}})
        return res.json({
            data: posts
        })
    } catch(e) {
        console.error(e)
        return res.json({
            errors: {
                message: "Internal server error"
            }
        }, {status: 500})
    }
}