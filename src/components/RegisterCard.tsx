"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import axios from "axios"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const RegisterCard = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    })
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()
    const toggleVisible = () => setIsVisible(!isVisible)

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (!input.name || !input.email || !input.username || !input.password || !input.password2) {
            console.log("can't assign empty field")
            return
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)) {
            console.log("password format doesn't match requirement")
            return
        }

        if (input.password != input.password2) {
            console.log("Password not same")
            return
        }

        const data = {
            name: input.name,
            email: input.email,
            username: input.username,
            password: input.password,
        }

        try {
            const res = await axios.post("/api/users", data)
            if(res.status == 200) {
                console.log("Register success")
                router.push("/login")
            }
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
        } else if (target.name === "password2") {
            newInput.password2 = target.value
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
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="password" label="Password" type={isVisible ? "text" : "password"} endContent= {
                        <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? (
                                <EyeOffIcon size={25} className="pointer-events-none"/>
                            ) : (
                                <EyeIcon size={25} className="pointer-events-none" />
                            )}
                        </button>
                    } />
                    <div className="text-xs mb-2 px-2">
                        <ol className="ml-4 list-disc">
                            <li>Min length 8</li>
                            <li>1 uppercase</li>
                            <li>1 lowercase</li>
                            <li>1 number</li>
                        </ol>
                    </div>
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="password2" label="Confirm Password" type={isVisible ? "text" : "password"} endContent= {
                        <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? (
                                <EyeOffIcon size={25} className="pointer-events-none"/>
                            ) : (
                                <EyeIcon size={25} className="pointer-events-none" />
                            )}
                        </button>
                    } />
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