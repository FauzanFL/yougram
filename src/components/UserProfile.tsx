"use client"

import { InputError } from "@/utils/structure"
import { toastFailed, toastSuccess } from "@/utils/toaster"
import { Button, Card, CardBody, CardFooter, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import axios from "axios"
import { StickyNote } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type inputErrors = {
    name: InputError,
    email: InputError,
    username: InputError
}

export const UserProfile = ({user, isMyProfile}: {user:any, isMyProfile: boolean}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [errors, setErrors] = useState<inputErrors>({
        name: {status: false, message: ""},
        email: {status: false, message: ""},
        username: {status: false, message: ""}
    })
    const [input, setInput] = useState({
        name: user.name,
        email: user.email,
        username: user.username
    })
    const router = useRouter()

    const handleChange = (target: HTMLInputElement & EventTarget) => {
        const newInput = {...input}
        if (target.name === "name") {
            newInput.name = target.value
        } else if (target.name === "email") {
            newInput.email = target.value
        } else if (target.name === "username") {
            newInput.username = target.value
        }
        setInput(newInput)
    }

    const handleLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout")
            if (res.status == 200) {
                toastSuccess("Logout success")
                router.push("/login")
            }
        } catch(e) {
            toastFailed("Logout failed")
            console.error(e)
        }
    }

    const validate = () => {
        let isError = false
        const newError = {...errors}

        newError.name.status = false
        newError.email.status = false
        newError.username.status = false
        
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

        setErrors(newError)
        return isError
    }

    const handleUpdate = async (onClose: any) => {
        const data = {
            name: input.name,
            email: input.email,
            username: input.username
        }

        const isError = validate()
        if (!isError) {
            try {
                const res = await axios.put("/api/users", data)
                if (res.status == 200) {
                    toastSuccess("Update profile successful")
                }
                onClose()
                router.refresh()
            } catch(e: any) {
                console.error(e)
                if (e.response.status == 400 && e.response.data.errors.message == "username has been taken") {
                    const newError = {...errors}
                    newError.username.status = true
                    newError.username.message = "Username has been taken"
                    setErrors(newError)
                } else if(e.response.status == 500) {
                    toastFailed("Failed to update profile")
                    onClose()
                    router.refresh()
                }
            }
        }
    }
    return (
        <div>
            <Card className="p-4 max-w-[400px] mx-auto">
                <CardBody>
                    <div className="mb-2">
                        <div className="my-1">Username: <span className="font-semibold">{user.username}</span></div>
                        <div className="my-1">Name: <span className="font-semibold">{user.name}</span></div>
                        <div className="my-1">Email: <span className="font-semibold">{user.email}</span></div>
                    </div>
                    {isMyProfile === true && (
                        <div className="flex justify-center items-center gap-3">
                            <Button onPress={onOpen} size="sm" color="primary" variant="solid">Edit profile</Button>
                            <Button onClick={handleLogout} size="sm" color="danger" variant="solid">Logout</Button>
                        </div>
                    )}
                </CardBody>
                <Divider/>
                <CardFooter>
                    <div className="flex justify-center"><StickyNote className="mr-1" size={25}/><span className="font-semibold">{`${user.Post.length} posts`}</span></div>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
                    <ModalBody>
                        <Input defaultValue={user.name} onChange={({target}) => handleChange(target)} className="mb-2" name="name" label="Name" type="text" isInvalid={errors.name.status} errorMessage={errors.name.message} />
                        <Input defaultValue={user.email} onChange={({target}) => handleChange(target)} className="mb-2" name="email" label="Email" type="email" isInvalid={errors.email.status} errorMessage={errors.email.message} />
                        <Input defaultValue={user.username} onChange={({target}) => handleChange(target)} className="mb-2" name="username" label="Username" type="text" isInvalid={errors.username.status} errorMessage={errors.username.message} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={() => handleUpdate(onClose)}>
                        Update
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </div>
    )
}