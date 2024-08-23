import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Sidebar } from "@/components/Sidebar";
import { UserProfile } from "@/components/UserProfile";
import db from "@/lib/db";
import { getSession } from "@/lib/sessionCookie";
import { Divider } from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "YouGram | Profile"
}

export default async function Profile({params}: {params: {username:string}}) {
    const {username} = params
    const session = getSession()
    if (!session) {
        redirect("/login")
    }

    const user = await db.user.findFirst({where: {username}, include: {Post: true}})
    if (!user) {
        redirect("/_not-found")
    }
    
    return (
        <div className="md:flex">
            <Header page="profile" username={username}/>
            <Sidebar page="profile" username={username}/>
            <main className="p-4 flex-grow">
                <UserProfile user={user}/>
                <h2 className="mt-8 mb-1 mx-2 font-bold">My Posts</h2>
                <Divider/>
                <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* <PostCard/>
                    <PostCard/>
                    <PostCard/> */}
                </div>
            </main>
        </div>
    )
}