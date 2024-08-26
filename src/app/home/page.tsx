import { ButtonCreatePost } from "@/components/ButtonCreatePost";
import { Header } from "@/components/Header";
import { Post } from "@/components/Post";
import { Sidebar } from "@/components/Sidebar";
import db from "@/lib/db";
import { getSession } from "@/lib/sessionCookie";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "YouGram | Home"
}

export default async function HomePage() {
    const session = await getSession()
    if (!session) redirect("/login")
    const posts = await db.post.findMany({orderBy: {createdAt: "desc"}, include: {user: true}})
    return (
        <div className="md:flex">
            <Header page="home" username={session.username}/>
            <Sidebar page="home" username={session.username}/>
            <main className="flex-grow">
                <Post posts={posts}/>
                <div className="fixed bottom-3 right-3">
                    <ButtonCreatePost/>
                </div>
            </main>
        </div>
    )
}