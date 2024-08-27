import db from "@/lib/db"
import { NextResponse } from "next/server"

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    const id = parseInt(params.id)
    try {
        const post = await db.post.findUnique({where: {id}})
        if (!post) {
            return NextResponse.json({
                errors: {
                    message: "Post not founf"
                }
            }, {status: 404})
        }

        await db.$transaction([
            db.post.delete({where: {id}}),
            db.postLiked.deleteMany({where: {postId: id}}),
            db.comment.deleteMany({where: {postId: id}})
        ])

        return NextResponse.json({
            data: {
                message: "Delete post successful"
            }
        })
    } catch(e) {
        return NextResponse.json({
            errors: {
                message: "Internal Server Error"
            }
        }, {status: 500})
    }
}