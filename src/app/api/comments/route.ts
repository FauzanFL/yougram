import db from "@/lib/db";
import { getSession } from "@/lib/sessionCookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const {content, postId} = await req.json();
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
            }, {status: 404})
        }

        const postIdInt = parseInt(postId)
        const post = await db.post.findFirst({where: {id: postIdInt}})
        if (!post) {
            return NextResponse.json({
                errors: {
                    message: "Post not found"
                }
            }, {status: 404})
        }
        
        if (!content) {
            return NextResponse.json({
                errors: {
                    message: "Content can't be empty"
                }
            }, {status: 400})
        }

        await db.comment.create({data: {content, postId: postIdInt, userId:user.id}})

        return NextResponse.json({
            data: {
                message: "Comment created successful"
            }
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