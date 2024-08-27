"use client"
import { Post } from "@/utils/structure"
import { Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react"
import axios from "axios"
import { HeartIcon, MessageCircle, UserCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PostCard = ({post}: {post: Post}) => {
    const [isLiked, setIsLiked] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function checkLike() {
            try {
                const res = await axios.post("/api/postliked/isliked", {postId: post.id})
                if (res.status == 200) {
                    setIsLiked(res.data.data)
                }
            } catch(e) {
                console.error(e)
            }
        }
        checkLike()
    }, [post.id])
    
    const handleLike = async () => {
        try {
            const res = await axios.get(`/api/posts/like/${post.id}`)
            if(res.status == 200) {
                setIsLiked(true)
            }
        } catch(e) {
            console.error(e)
        } finally {
            router.refresh()
        }
    }

    const handleDislike = async () => {
        try {
            const res = await axios.get(`/api/posts/dislike/${post.id}`)
            if(res.status == 200) {
                setIsLiked(false)
            }
        } catch(e) {
            console.error(e)
        } finally {
            router.refresh()
        }
    }

    return (
        <>
            <Card className="md:max-w-[450px] p-2">
                <CardHeader className="flex">
                    <UserCircle2 size={20} className="mr-1"/> 
                    <Link href="/profile" className="text-sm text-black hover:text-blue-500 hover:underline">{post.user.username}</Link>
                </CardHeader>
                <Divider/>
                <CardBody className="py-3">{post.content}</CardBody>
                <Divider/>
                <CardFooter>
                    <div className="flex gap-2">
                        <div className="flex mr-1 gap-1">
                            <HeartIcon onClick={isLiked ? handleDislike : handleLike} fill={isLiked ? "#ff0000" : "#fff"} color={isLiked ? "#ff0000" : "#000"} className="hover:cursor-pointer" size={25}/>
                            <span className="font-semibold">{post.likeCount}</span>
                        </div>
                        <MessageCircle className="hover:cursor-pointer" size={25}/>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}