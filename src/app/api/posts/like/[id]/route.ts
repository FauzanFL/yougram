import db from "@/lib/db";
import { getSession } from "@/lib/sessionCookie";
import { NextResponse } from "next/server"

export async function GET(request: Request, {params}: {params: {id: string}}) {
    try {
        const id = parseInt(params.id)
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

        const postLiked = await db.postLiked.findFirst({where: {userId: user.id, postId: id}})
        if (postLiked) {
            return NextResponse.json({
                errors: {
                    message: "User has liked the post"
                }
            }, {status: 400})
        }

        const post = await db.post.findFirst({where: {id}})
        if (!post) {
            return NextResponse.json({
                errors: {
                    message: "Post not found"
                }
            }, {status: 400})
        }

        const data = {
            userId: user.id,
            postId: id
        }

        const likeCount = post.likeCount + 1

        await db.$transaction(
            [
                db.postLiked.create({data}),
                db.post.update({where: {id}, data: {likeCount}})
            ]
        )

        return NextResponse.json({
            data: {
                message: "Post liked"
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