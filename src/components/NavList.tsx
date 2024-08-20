"use client"

import { Button, Link } from "@nextui-org/react"
import { HomeIcon, SearchIcon, UserCircle } from "lucide-react"

export const NavList = () => {
    return (
        <nav className="flex flex-col gap-4 my-4">
            <Button href="/home" variant="light" className="flex justify-start" as={Link}>
                <HomeIcon size={30} className="mr-1"/>
                Home
            </Button>
            <Button href="/search" variant="light" className="flex justify-start" as={Link}>
                <SearchIcon size={30} className="mr-1"/>
                Search
            </Button>
            <Button href="/profile" variant="light" className="flex justify-start" as={Link}>
                <UserCircle size={30} className="mr-1"/>
                Profile
            </Button>
        </nav>
    )
}