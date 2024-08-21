"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

export const LoginCard = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        try {
            const res = await axios.post("/api/users/login",{username, password})
            console.log(res)
        } catch(e) {
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
                    <Input onChange={({target})=> setPassword(target.value)} className="mb-2" label="Password" type="password" />
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