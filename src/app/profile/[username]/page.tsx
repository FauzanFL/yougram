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
    const session = await getSession()
    if (!session) {
        redirect("/login")
    }

    const user = await db.user.findFirst({where: {username}, include: {Post: {include: {Comment: {include: {user: true}, orderBy: {createdAt: "desc"}}, user: true}}}})
    if (!user) {
        redirect("/_not-found")
    }

    const isMyProfile = username === session.username
    return (
        <div className="md:flex">
            <Header page="profile" username={session.username}/>
            <Sidebar page="profile" username={session.username}/>
            <main className="p-4 flex-grow h-[100dvh] overflow-y-auto">
                <UserProfile user={user} isMyProfile={isMyProfile}/>
                <h2 className="mt-8 mb-1 mx-2 font-bold">My Posts</h2>
                <Divider/>
                <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {user.Post.map((post, i) => {
                        return (
                            <>
                            <PostCard key={i} post={post} username={session.username}/>
                            </>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}