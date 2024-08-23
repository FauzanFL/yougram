import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { Sidebar } from "@/components/Sidebar";
import { UserProfile } from "@/components/UserProfile";
import { getSession } from "@/lib/sessionCookie";
import { Divider } from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "YouGram | Profile"
}

export default function Profile() {
    const session = getSession()
    if (!session) redirect("/login")
    return (
        <div className="md:flex">
            <Header page="profile"/>
            <Sidebar page="profile"/>
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