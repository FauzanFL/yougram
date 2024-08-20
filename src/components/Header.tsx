"use client"
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import { HomeIcon, SearchIcon, UserCircle } from "lucide-react"
import { useState } from "react"

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Navbar 
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="md:hidden">
            <NavbarContent>
                <div className="font-bold">YouGram</div>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu": "Open menu"} />
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Button variant="light" className="flex justify-start" as={Link}>
                        <HomeIcon size={30} className="mr-1"/>
                        Home
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button variant="light" className="flex justify-start" as={Link}>
                        <SearchIcon size={30} className="mr-1"/>
                        Search
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button variant="light" className="flex justify-start" as={Link}>
                        <UserCircle size={30} className="mr-1"/>
                        Profile
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}