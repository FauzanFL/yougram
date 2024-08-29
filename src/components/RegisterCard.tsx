"use client"
import { InputError } from "@/utils/structure"
import { toastFailed, toastSuccess } from "@/utils/toaster"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import axios from "axios"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type inputErrors = {
    name: InputError,
    email: InputError,
    username: InputError,
    password: InputError,
    password2: InputError
}

export const RegisterCard = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        password2: ''
    })
    const [isVisible, setIsVisible] = useState(false)
    const [errors, setErrors] = useState<inputErrors>({
        name: {status: false, message: ""},
        email: {status: false, message: ""},
        username: {status: false, message: ""},
        password: {status: false, message: ""},
        password2: {status: false, message: ""},
    })
    const router = useRouter()
    const toggleVisible = () => setIsVisible(!isVisible)

    const validate = (): boolean => {
        let isError = false
        const newError = {...errors}

        newError.name.status = false
        newError.email.status = false
        newError.username.status = false
        newError.password.status = false
        newError.password2.status = false

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input.password)) {
            newError.password.status = true
            newError.password2.status = true
            newError.password.message = "Password format doesn't match requirement"
            newError.password2.message = "Password format doesn't match requirement"
            isError = true
        }

        if (input.password != input.password2) {
            newError.password.status = true
            newError.password2.status = true
            newError.password.message = "Password not same"
            newError.password2.message = "Password not same"
            isError = true
        }
        
        if (!input.name) {
            newError.name.status = true
            newError.name.message = "Name can't be empty"
            isError = true
        }
        if (!input.email) {
            newError.email.status = true
            newError.email.message = "Email can't be empty"
            isError = true
        }
        if (!input.username) {
            newError.username.status = true
            newError.username.message = "Username can't be empty"
            isError = true
        }
        if (!input.password) {
            newError.password.status = true
            newError.password.message = "Password can't be empty"
            isError = true
        }
        if (!input.password2) {
            newError.password2.status = true
            newError.password2.message = "Confirm password can't be empty"
            isError = true
        }

        setErrors(newError)
        return isError
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const data = {
            name: input.name,
            email: input.email,
            username: input.username,
            password: input.password,
        }

        const isError = validate()
        if (!isError) {
            try {
                const res = await axios.post("/api/users", data)
                if(res.status == 200) {
                    toastSuccess("Register succes")
                    router.push("/login")
                }
            } catch (e: any) {
                console.error(e)
                if (e.response.status == 400 && e.response.data.errors.message == "username has been taken") {
                    const newError = {...errors}
                    newError.username.status = true
                    newError.username.message = "Username has been taken"
                    setErrors(newError)
                } else if (e.response.status == 500) {
                    toastFailed("Register failed")
                }
            }
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
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="name" label="Name" type="text" isInvalid={errors.name.status} errorMessage={errors.name.message} />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="email" label="Email" type="email" isInvalid={errors.email.status} errorMessage={errors.email.message} />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="username" label="Username" type="text" isInvalid={errors.username.status} errorMessage={errors.username.message} />
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="password" label="Password" type={isVisible ? "text" : "password"} isInvalid={errors.password.status} errorMessage={errors.password.message} endContent= {
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
                    <Input onChange={({target}) => handleChange(target)} className="mb-2" name="password2" label="Confirm Password" type={isVisible ? "text" : "password"} isInvalid={errors.password2.status} errorMessage={errors.password2.message} endContent= {
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