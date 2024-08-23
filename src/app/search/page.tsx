import { Header } from "@/components/Header"
import { SearchSection } from "@/components/SearchSection"
import { Sidebar } from "@/components/Sidebar"
import { getSession } from "@/lib/sessionCookie"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "YouGram | Search"
}

export default function Search () {
    const session = getSession()
    if (!session) redirect("/home")
    return (
        <>
        <div className="md:flex">
            <Header page="search"/>
            <Sidebar page="search"/>
            <main className="flex-grow">
                <SearchSection/>
            </main>
        </div>
        </>
    )
}