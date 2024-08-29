"use client"
import { toastFailed, toastSuccess } from "@/utils/toaster"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react"
import axios from "axios"
import { SquarePen } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const ButtonCreatePost = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [content, setContent] = useState("")
    const router = useRouter()

    const handleCreate = async (onClose: any) => {
        if (!content) {
            console.log("Content can't be empty")
            return
        }
        try {
            const res = await axios.post("/api/posts", {content})
            if (res.status == 200) {
                toastSuccess("Post created successfully")
            }
        } catch(e: any) {
            console.error(e)
            if(e.response.status == 500) {
                toastFailed("Failed to create post")
            }
        } finally {
            setContent("")
            onClose()
            router.refresh()
        }
    }
    return (
        <>
        <Button onPress={onOpen} size="sm" className="p-1" radius="full"><SquarePen size={25}/></Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">New Post</ModalHeader>
                    <ModalBody>
                        <Textarea
                        onChange={({target}) => setContent(target.value)}
                        isRequired
                        placeholder="Write here..."
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={() => handleCreate(onClose)}>
                        Create
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}