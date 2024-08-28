"use client"
import { Button, Divider, Input, user } from "@nextui-org/react"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import { PostCard } from "./PostCard"
import { UserCard } from "./UserCard"
import { Post, User } from "@/utils/structure"
import axios from "axios"

export const SearchSection = ({username}: {username: string}) => {
    const [category, setCategory] = useState('user');
    const [users, setUsers] = useState<User[]>([])
    const [posts, setPosts] = useState<Post[]>([])

    const handleOnChange = async (keyword: string) => {
        if (keyword.length > 0) {
            try {
                const postRes = await axios.get(`/api/posts/search?keyword=${keyword}`)
                if (postRes.status == 200) {
                    setPosts(postRes.data.data)
                }
                
                const userRes = await axios.get(`/api/users/search?keyword=${keyword}`)
                if (userRes.status == 200) {
                    setUsers(userRes.data.data)
                }
            } catch(e) {
                console.error(e)
            }
        } else {
            setPosts([])
            setUsers([])
        }
    }

    return (
        <>
        <div className="p-2">
            <Input
            className="md:max-w-[400px]"
            type="text"
            onChange={({target}) => handleOnChange(target.value)}
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
                {category === 'user' &&  users.map((user, i) => {
                        return (
                            <UserCard key={i}  user={user}/>
                        )
                })}
                {category === 'post' &&  posts.map((post: Post, i) => {
                    const postUser = {
                        ...post,
                        user: post.user
                    }
                    return (
                        <PostCard key={i} post={postUser} username={username}/>
                    )
                })}
            </div>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="p-2">
                <h3 className="font-semibold">Posts</h3>
                <Divider/>
                <div className="flex flex-col gap-2 p-2">
                { posts.map((post: Post, i) => {
                        const postUser = {
                            ...post,
                            user: post.user
                        }
                        return (
                            <PostCard key={i} post={postUser} username={username}/>
                        )
                    })}
                </div>
            </div>
            <div className="p-2">
                <h3 className="font-semibold">Users</h3>
                <Divider/>
                <div className="flex flex-col gap-2 p-2">
                    {users.map((user, i) => {
                        return (
                            <UserCard key={i} user={user} />
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}