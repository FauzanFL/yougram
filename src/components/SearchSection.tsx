"use client"
import { Button, Divider, Input } from "@nextui-org/react"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

export const SearchSection = () => {
    const [category, setCategory] = useState('user');
    const [keyword, setKeyword] = useState('')
    return (
        <>
        <div className="">
            <Input
            type="text"
            onChange={({target}) => setCategory(target.value)}
            placeholder="Search..."
            startContent = {
                <SearchIcon size={25}/>
            }
            />
        </div>
        <Divider/>
        <div className="md:hidden">
            <div className="flex gap-2">
                <Button onClick={() => setCategory('user')} color="primary" variant={category === 'user' ? "solid": "ghost"}>User</Button>
                <Button onClick={() => setCategory('post')} color="primary" variant={category === 'post' ? "solid": "ghost"}>Post</Button>
            </div>
            {category === 'user' && (
                <div className="">User</div>
            )}
            {category === 'post' && (
                <div className="">Post</div>
            )}
        </div>
        <div className="hidden md:grid grid-cols-2">
            <div className="">User</div>
            <div className="">Post</div>
        </div>
        </>
    )
}