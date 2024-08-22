import { ButtonCreatePost } from "@/components/ButtonCreatePost";
import { Header } from "@/components/Header";
import { Post } from "@/components/Post";
import { Sidebar } from "@/components/Sidebar";
import db from "@/lib/db";

export default async function HomePage() {
    const posts = await db.post.findMany({orderBy: {createdAt: "desc"}})
    return (
        <div className="md:flex">
            <Header page="home"/>
            <Sidebar page="home"/>
            <main className="flex-grow">
                <Post posts={posts}/>
                <div className="fixed bottom-3 right-3">
                    <ButtonCreatePost/>
                </div>
            </main>
        </div>
    )
}