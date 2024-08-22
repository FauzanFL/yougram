import { Header } from "@/components/Header"
import { SearchSection } from "@/components/SearchSection"
import { Sidebar } from "@/components/Sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "YouGram | Search"
}

export default function Search () {
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