import { Header } from "@/components/Header"
import { SearchSection } from "@/components/SearchSection"
import { Sidebar } from "@/components/Sidebar"
import { getSession } from "@/lib/sessionCookie"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "YouGram | Search"
}

export default async function Search () {
    const session = await getSession()
    if (!session) redirect("/login")
    return (
        <>
        <div className="md:flex">
            <Header page="search" username={session.username}/>
            <Sidebar page="search" username={session.username}/>
            <main className="flex-grow">
                <SearchSection/>
            </main>
        </div>
        </>
    )
}