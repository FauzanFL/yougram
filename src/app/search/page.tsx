import { Header } from "@/components/Header"
import { SearchSection } from "@/components/SearchSection"
import { Sidebar } from "@/components/Sidebar"

export default function Search () {
    return (
        <>
        <div className="md:flex">
            <Header/>
            <Sidebar/>
            <main>
                <SearchSection/>
            </main>
        </div>
        </>
    )
}