"use client"
import { Button, Divider, Input } from "@nextui-org/react"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { PostCard } from "./PostCard"
import { UserCard } from "./UserCard"

export const SearchSection = () => {
    const [category, setCategory] = useState('user');
    const [keyword, setKeyword] = useState('')
    return (
        <>
        <div className="p-2">
            <Input
            className="md:max-w-[400px]"
            type="text"
            onChange={({target}) => setKeyword(target.value)}
            placeholder="Search..."
            startContent = {
                <SearchIcon size={25}/>
            }
            />
        </div>
        <div className="md:hidden">
            <div className="flex gap-2 py-2 px-4">
                <Button onClick={() => setCategory('user')} color="primary" size="sm" variant={category === 'user' ? "solid": "ghost"}>User</Button>
                <Button onClick={() => setCategory('post')} color="primary" size="sm" variant={category === 'post' ? "solid": "ghost"}>Post</Button>
            </div>
            <div className="flex flex-col gap-2 p-2">
                {category === 'user' && (
                    <>
                    <UserCard/>
                    <UserCard/>
                    <UserCard/>
                    </>
                )}
                {category === 'post' && (
                    <>
                    {/* <PostCard/>
                    <PostCard/>
                    <PostCard/> */}
                    </>
                )}
            </div>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="p-2">
                <h3 className="font-semibold">Posts</h3>
                <Divider/>
                <div className="flex flex-col gap-2 p-2">
                    {/* <PostCard/>
                    <PostCard/>
                    <PostCard/> */}
                </div>
            </div>
            <div className="p-2">
                <h3 className="font-semibold">Users</h3>
                <Divider/>
                <div className="flex flex-col gap-2 p-2">
                    <UserCard/>
                    <UserCard/>
                    <UserCard/>
                </div>
            </div>
        </div>
        </>
    )
}