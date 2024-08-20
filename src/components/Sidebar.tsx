import { Divider } from "@nextui-org/react"
import { NavList } from "./NavList"

export const Sidebar = () => {
    return (
        <div className="hidden md:block w-1/4 h-[100dvh] bg-white p-4">
            <div className="text-2xl font-bold mb-4">
                YouGram
            </div>
            <Divider/>
            <NavList/>
        </div>
    )
}