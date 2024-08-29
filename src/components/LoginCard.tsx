"use client"
import { toastFailed, toastSuccess } from "@/utils/toaster"
import {  Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import axios from "axios"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const LoginCard = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            const res = await axios.post("/api/users/login",{username, password})
            if (res) {
                toastSuccess("Login Success")
                router.push("/home")
            }
        } catch(e: any) {
            if (e.response.status == 500) {
                toastFailed("Login Failed")
            }
            console.error(e)
        }
    }
    return (
        <>
        <Card className="p-4 w-full md:w-[400px] lg:w-[600px]">
            <CardHeader className="flex flex-col items-start">
                <div className="text-2xl font-bold">Log In</div>
                <p className="mt-1 text-sm">Log in to your timeline!</p>
            </CardHeader>
            <CardBody className="">
                <form onSubmit={handleSubmit}>
                    <Input onChange={({target})=> setUsername(target.value)} className="mb-2" label="Username" type="text" />
                    <Input onChange={({target})=> setPassword(target.value)} className="mb-2" label="Password" type={isVisible ? "text" : "password"} endContent= {
                        <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? (
                                <EyeOff size={25} className="pointer-events-none"/>
                            ) : (
                                <Eye size={25} className="pointer-events-none" />
                            )}
                        </button>
                    } />
                    <div className="mt-2 flex justify-center items-center">
                        <Button type="submit" size="md" color="primary">Log In</Button>
                    </div>
                </form>
            </CardBody>
            <CardFooter className="text-sm flex justify-center items-center">{"Don't have account? "}
                <Link href={"/signup"} className="ml-1 text-blue-500 hover:underline">Sign Up</Link>
            </CardFooter>
        </Card>
        </>
    )
}