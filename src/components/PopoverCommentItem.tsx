"use client"
import { Comment } from "@/utils/structure"
import { toastFailed, toastSuccess } from "@/utils/toaster"
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import axios from "axios"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const PopoverCommentItem = ({comment}: {comment: Comment}) => {
    const [isPopover, setIsPopOver] = useState(false)
    const router = useRouter()
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/comments/${comment.id}`)
            if (res.status == 200) {
                toastSuccess("Comment deleted successfully")
            }
        } catch(e) {
            console.error(e)
            toastFailed("Failed to delete comment")
        } finally {
            setIsPopOver(false)
            router.refresh()
        }
    }
    return (
        <>
            <Popover isOpen={isPopover} onOpenChange={(open) => setIsPopOver(open)}>
                <PopoverTrigger className="p-1 rounded-full hover:cursor-pointer">
                    <div className="p-2 space-y-1 bg-gray-100 rounded-md">
                        <div className="font-semibold">{comment.user.username}</div>
                        <div className="text-sm">{comment.content}</div>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-1">
                        <Button onPress={handleDelete} variant="light" className="text-sm flex justify-start">
                            <Trash2 size={20} color="#ff0000" />
                            Delete
                        </Button>
                        {/* <Button onPress={() => {
                            onOpen()
                            setIsPopOver(false)
                        }} variant="light" className="text-sm flex justify-start">
                            <Pencil size={20} color="#ffa500" />
                            Edit
                        </Button> */}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}