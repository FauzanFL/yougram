import db from "@/lib/db"
import { getSession } from "@/lib/sessionCookie";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try{
        const {postId} = await req.json()
        const payload = await getSession();
        if (!payload) {
            return NextResponse.json({
                errors: {
                    message: "Unauthorized"
                }
            }, {status: 401})
        }

        const username = payload.username
        const user = await db.user.findFirst({where: {username}})
        if (!user) {
            return NextResponse.json({
                errors: {
                    message: "User not found"
                }
            }, {status: 400})
        }

        const postLiked = await db.postLiked.findFirst({where: {userId: user.id, postId}})
        
        return NextResponse.json({
            data: (postLiked) ? true : false
        })
    } catch(e) {
        console.error(e)
        return NextResponse.json({
            errors: {
                message: "Internal Server Error"
            }
        })
    }
}