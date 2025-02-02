import db from "@/lib/db"
import { NextResponse } from "next/server"

export const DELETE = async (req: Request, {params}: {params: {id: string}}) => {
    const id = parseInt(params.id)
    try {
        const comment = await db.comment.findUnique({where: {id}})
        if (!comment) {
            return NextResponse.json({
                errors: {
                    message: "Comment not found"
                }
            }, {status: 404})
        }

        await db.comment.delete({where: {id}})

        return NextResponse.json({
            data: {
                message: "Delete comment successful"
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