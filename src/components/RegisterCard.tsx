"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

export const RegisterCard = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    })

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (!input.name || !input.email || !input.username || !input.password || input.password2) {
            console.log("can't assign empty field")
        }

        if (input.password != input.password2) {
            console.log("Password not same")
        }

        const data = {
            name: input.name,
            email: input.email,
            username: input.username,
            password: input.password,
        }

        try {
            const res = await axios.post("/api/users", data)
            console.log(res)
        } catch (e) {
            console.error(e)
        }
    }

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        const newInput = {...input}
        if (target.name === "name") {
            newInput.name = target.value
        } else if (target.name === "email") {
            newInput.email = target.value
        } else if (target.name === "username") {
            newInput.username = target.value
        } else if (target.name === "password") {
            newInput.password = target.value
        }

        setInput(newInput)
    }

    return (
        <>
        <Card className="p-4 w-full md:w-[400px] lg:w-[600px]">
            <CardHeader className="flex flex-col items-start">
                <div className="text-2xl font-bold">Sign Up</div>
                <p className="mt-1 text-sm">Join our community!</p>
            </CardHeader>
            <CardBody className="">
                <form onSubmit={handleSubmit}>
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="name" label="Name" type="text" />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="email" label="Email" type="email" />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="username" label="Username" type="text" />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="password" label="Password" type="password" />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="password2" label="Confirm Password" type="password" />
                    <div className="mt-2 flex justify-center items-center">
                        <Button type="submit" size="md" color="primary">Sign Up</Button>
                    </div>
                </form>
            </CardBody>
            <CardFooter className="text-sm flex justify-center items-center">{"Have an account? "}
            <Link href={"/login"} className="ml-1 text-blue-500 hover:underline">Log In</Link>
            </CardFooter>
        </Card>
        </>
    )
}