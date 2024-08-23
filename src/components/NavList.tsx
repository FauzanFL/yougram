"use client"

import { Button, Link } from "@nextui-org/react"
import { HomeIcon, SearchIcon, UserCircle } from "lucide-react"

export const NavList = ({page, username}: {page: string, username: string}) => {
    return (
        <nav className="flex flex-col gap-4 my-4">
            <Button href="/home" variant={page === 'home'?"flat":"light"} className="flex justify-start" as={Link}>
                <HomeIcon size={30} className="mr-1"/>
                Home
            </Button>
            <Button href="/search" variant={page === 'search'?"flat":"light"} className="flex justify-start" as={Link}>
                <SearchIcon size={30} className="mr-1"/>
                Search
            </Button>
            <Button href={`/profile/${username}`} variant={page === 'profile'?"flat":"light"} className="flex justify-start" as={Link}>
                <UserCircle size={30} className="mr-1"/>
                Profile
            </Button>
        </nav>
    )
}