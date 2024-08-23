"use client"
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import { HomeIcon, SearchIcon, UserCircle } from "lucide-react"
import { useState } from "react"

export const Header = ({page, username}: {page: string, username: string}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Navbar 
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="md:hidden">
            <NavbarContent>
                <h1 className="font-bold">YouGram</h1>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu": "Open menu"} />
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Button href="/home" variant={page === 'home'?"flat":"light"} className="flex justify-start" as={Link}>
                        <HomeIcon size={30} className="mr-1"/>
                        Home
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button href="/search" variant={page === 'search'?"flat":"light"} className="flex justify-start" as={Link}>
                        <SearchIcon size={30} className="mr-1"/>
                        Search
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button href={`/profile/${username}`} variant={page === 'profile'?"flat":"light"} className="flex justify-start" as={Link}>
                        <UserCircle size={30} className="mr-1"/>
                        Profile
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}