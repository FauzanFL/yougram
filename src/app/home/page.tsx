import { Header } from "@/components/Header";
import { Post } from "@/components/Post";
import { Sidebar } from "@/components/Sidebar";

export default function HomePage() {
    return (
        <div className="md:flex">
            <Header page="home"/>
            <Sidebar page="home"/>
            <main className="flex-grow">
                <Post/>
            </main>
        </div>
    )
}