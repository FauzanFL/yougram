import { removeSession } from "@/lib/sessionCookie";
import { NextResponse } from "next/server";

export const GET = () => {
    removeSession();
    return NextResponse.json({
        data: {
            message: "Logout successful!"
        }
    })
}