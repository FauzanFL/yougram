import db from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    const id = parseInt(params.id)
    try {
        const post = await db.post.findUnique({where: {id}})
        if (!post) {
            return NextResponse.json({
                errors: {
                    message: "Post not found"
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

export const PUT = async (req: NextRequest, {params}: {params: {id: string}}) => {
    const id = parseInt(params.id)
    try {
        const {content} = await req.json()
        const post = await db.post.findUnique({where: {id}})
        if (!post) {
            return NextResponse.json({
                errors: {
                    message: "Post not found"
                }
            }, {status: 404})
        }

        await db.post.update({where: {id: post.id}, data: {content}})

        return NextResponse.json({
            data: {
                message: "Update post successful"
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