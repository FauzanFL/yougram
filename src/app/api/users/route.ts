import db from "@/lib/db";

export const GET = async () => {
    const users = await db.user.findMany();

    const res = {
        data: users
    }
    return res
}