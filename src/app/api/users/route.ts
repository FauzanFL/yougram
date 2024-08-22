import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const users = await db.user.findMany();

    const res = {
        data: users
    }
    return res
}

export const POST = async (req: NextRequest) => {
    const [name, email, username, password] = await req.json() 
    const res = NextResponse

    if (!name) {
        return res.json({
            errors: {
                message: "name can't be empty"
            }
        }, {
            status: 400
        })
    }
    if (!email) {
        return res.json({
            errors: {
                message: "email can't be empty"
            }
        }, {
            status: 400
        })
    }
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

    const data = {
        name,
        email,
        username,
        password
    }

    try {
        await db.user.create({data})
        return res.json({
            data: {
                message: "Register successful!"
            }
        })
    } catch(e) {
        console.error(e)
        return res.json({
            errors: {
                message: "Internal server error"
            }
        }, {
            status: 500
        })
    }
}