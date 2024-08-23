import db from "@/lib/db"
import { getSession } from "@/lib/sessionCookie"
import { NextRequest, NextResponse } from "next/server"

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

export const POST = async (req: NextRequest) => {
    const {content} = await req.json();
    const payload = getSession();
    if (!payload) {
        return NextResponse.json({
            errors: {
                message: "Unauthorized"
            }
        }, {status: 401})
    }

    if (!content) {
        return NextResponse.json({
            errors: {
                message: "Content can't be empty"
            }
        }, {status: 400})
    }

    
    try {
        const username = payload.username
        const user = await db.user.findFirst({where: {username}})

        if (user) {
            await db.post.create({data: {
                content,
                userId: user.id,
                likeCount: 0
            }})
    
            return NextResponse.json({
                data: {
                    message: "Post create successful!"
                }
            })
        } 
        return NextResponse.json({
            errors: {
                message: "User not found"
            }
        }, {status: 400})
    } catch(e) {
        return NextResponse.json({
            errors: {
                message: "Internal Server Error"
            }
        }, {status: 500})
    }
}   