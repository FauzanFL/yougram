import { Divider } from "@nextui-org/react"
import { NavList } from "./NavList"

export const Sidebar = ({page}: {page: string}) => {
    return (
        <div className="hidden md:block w-1/4 h-[100dvh] bg-white p-4">
            <h1 className="text-2xl font-bold mb-4">
                YouGram
            </h1>
            <Divider/>
            <NavList page={page}/>
        </div>
    )
}