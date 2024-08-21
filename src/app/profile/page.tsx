import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Sidebar } from "@/components/Sidebar";
import { UserProfile } from "@/components/UserProfile";
import { Divider } from "@nextui-org/react";

export default function HomePage() {
    return (
        <div className="md:flex">
            <Header/>
            <Sidebar/>
            <main className="p-4 flex-grow">
                <UserProfile/>
                <h2 className="mt-8 mb-1 mx-2 font-bold">My Posts</h2>
                <Divider/>
                <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <PostCard/>
                    <PostCard/>
                    <PostCard/>
                </div>
            </main>
        </div>
    )
}