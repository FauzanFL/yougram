import db from "@/lib/db";
import { compare } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const {username, password} = await req.json();
    const res = NextResponse
    if (!username) {
        return res.json({
            errors: {
                message: "username can't be empty"
            }
        }, {
            status: 400
        })
    }
    if (!password) {
        return res.json({
            errors: {
                message: "password can't be empty"
            }
        }, {
            status: 400
        })
    }

    const user = await db.user.findFirst({where: {username}})
    if (!user) {
        return res.json({
            errors: {
                message: "username or password is wrong!"
            }
        }, {
            status: 400
        })
    }

    const isSame = await compare(password, user.password)
    if (!isSame) {
        return res.json({
            errors: {
                message: "username or password is wrong!"
            }
        }, {
            status: 400
        })
    }

    return res.json({
        data: {
            message: "Login successful!"
        }
    })
}