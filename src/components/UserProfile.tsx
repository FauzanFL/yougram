"use client"

import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react"
import axios from "axios"
import { StickyNote } from "lucide-react"
import { useRouter } from "next/navigation"

export const UserProfile = ({user, isMyProfile}: {user:any, isMyProfile: boolean}) => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout")
            if (res.status == 200) {
                router.push("/login")
            }
        } catch(e) {
            console.error(e)
        }
    }
    return (
        <>
            <Card className="p-4 max-w-[400px] mx-auto">
                <CardBody>
                    <div className="mb-2">
                        <div className="my-1">Username: <span className="font-semibold">{user.username}</span></div>
                        <div className="my-1">Name: <span className="font-semibold">{user.name}</span></div>
                        <div className="my-1">Email: <span className="font-semibold">{user.email}</span></div>
                    </div>
                    {isMyProfile === true && (
                        <div className="flex justify-center items-center gap-3">
                            <Button size="sm" color="primary" variant="solid">Edit profile</Button>
                            <Button onClick={handleLogout} size="sm" color="danger" variant="solid">Logout</Button>
                        </div>
                    )}
                </CardBody>
                <Divider/>
                <CardFooter>
                    <div className="flex justify-center"><StickyNote className="mr-1" size={25}/><span className="font-semibold">{`${user.Post.length} posts`}</span></div>
                </CardFooter>
            </Card>
        </>
    )
}