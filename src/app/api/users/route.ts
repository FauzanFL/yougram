import db from "@/lib/db";
import { getSession } from "@/lib/sessionCookie";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const {name, email, username, password} = await req.json() 
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

    const user = await db.user.findFirst({where: {username}})

    if (user) {
        return res.json({
            errors: {
                message: "username has been taken"
            }
        }, {
            status: 400
        })
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
        return res.json({
            errors: {
                message: "password format doesn't match requirement"
            }
        }, {
            status: 400
        })
    }

    const hashedPassword = await hashPassword(password)

    const data = {
        name,
        email,
        username,
        password: hashedPassword
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

export const PUT = async (req: NextRequest) => {
    const {name, username, email} = await req.json()

    if (!name) {
        return NextResponse.json({
            errors: {
                message: "name can't be empty"
            }
        }, {
            status: 400
        })
    }
    if (!email) {
        return NextResponse.json({
            errors: {
                message: "email can't be empty"
            }
        }, {
            status: 400
        })
    }
    if (!username) {
        return NextResponse.json({
            errors: {
                message: "username can't be empty"
            }
        }, {
            status: 400
        })
    }

    
    try {
        const payload = await getSession();
        if (!payload) {
            return NextResponse.json({
                errors: {
                    message: "Unauthorized"
                }
            }, {status: 401})
        }
        
        const user = await db.user.findFirst({where: {username: payload.username}})
        
        if (!user) {
            return NextResponse.json({
                errors: {
                    message: "user not found"
                }
            }, {
                status: 400
            })
        }

        if (username != user.username) {
            const checkUser = await db.user.findFirst({where: {username}})
        
            if (checkUser) {
                return NextResponse.json({
                    errors: {
                        message: "username has been taken"
                    }
                }, {
                    status: 400
                })
            }
        }

        const data = {
            name,
            email,
            username
        }

        await db.user.update({where: {id: user.id}, data})

        return NextResponse.json({
            data: {
                message: "Update user successful!"
            }
        })

    } catch(e) {
        console.error(e)
        return NextResponse.json({
            errors: {
                message: "Internal server error"
            }
        }, {
            status: 500
        })
    }
}

const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword
}