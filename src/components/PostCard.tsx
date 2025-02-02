"use client"
import { InputError, Post } from "@/utils/structure"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, Textarea, useDisclosure } from "@nextui-org/react"
import axios from "axios"
import { EllipsisVertical, HeartIcon, MessageCircle, Pencil, Trash2, UserCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CommentItem } from "./CommentItem"
import { toastFailed, toastSuccess } from "@/utils/toaster"
import { PopoverCommentItem } from "./PopoverCommentItem"

type inputErrors = {
    post: InputError,
    comment: InputError
}

export const PostCard = ({post, username}: {post: Post, username: string}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isPopover, setIsPopOver] = useState(false)
    const [content, setContent] = useState(post.content)
    const [commentContent, setCommentContent] = useState("")
    const {isOpen: isOpenConfirm, onOpen: onOpenConfirm, onOpenChange: onOpenConfirmChange} = useDisclosure()
    const {isOpen: isCommentOpen, onOpen: onCommentOpen, onOpenChange: onCommentOpenChange} = useDisclosure()
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [error, setError] = useState<inputErrors>({
        post: {status: false, message: ""},
        comment: {status: false, message: ""},
    })
    const router = useRouter()

    useEffect(() => {
        async function checkLike() {
            try {
                const res = await axios.get(`/api/postliked/isliked/${post.id}`)
                if (res.status == 200) {
                    setIsLiked(res.data.data)
                }
            } catch(e) {
                console.error(e)
            }
        }
        checkLike()
    }, [post.id])

    const validate = (type: "comment" | "post"): boolean => {
        let isError = false
        const newError = {...error}

        newError.post.status = false
        newError.comment.status = false

        switch (type) {
            case "post":
                if (!content) {
                    newError.post.status = true
                    newError.post.message = "Content can't be empty"
                    isError = true
                }
                break;
            case "comment":
                if (!commentContent) {
                    newError.comment.status = true
                    newError.comment.message = "Comment can't be empty"
                    isError = true
                }
            default:
                break;
        }

        setError(newError)
        return isError
    }

    const handleUpdatePost = async (onClose: any) => {
        const isError = validate("post")
        if (!isError) {
            try {
                const res = await axios.put(`/api/posts/${post.id}`, {content})
                if (res.status == 200) {
                    toastSuccess("Post updated successfully")
                }
            } catch(e) {
                console.error(e)
                toastFailed("Failed to update post")
            } finally {
                onClose()
                router.refresh()
            }
        }
    }

    const handleDeletePost = async () => {
        try {
            const res = await axios.delete(`/api/posts/${post.id}`)
            if (res.status == 200) {
                toastSuccess("Post deleted successfully")
            }
        } catch(e) {
            console.error(e)
            toastFailed("Failed to delete post")
        } finally {
            setIsPopOver(false)
            router.refresh()
        }
    }
    
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

    const handleAddComment = async () => {
        const data = {
            content: commentContent,
            postId: post.id
        }
        const isError = validate("comment")
        if (!isError) {
            try {
                const res = await axios.post("/api/comments", data)
                if (res.status == 200) {
                    toastSuccess("Comment added successfully")
                }
            } catch(e) {
                console.error(e)
                toastFailed("Failed to add comment")
            } finally {
                router.refresh()
                setCommentContent("")
            }
        }
    }

    return (
        <>
            <Card className="md:max-w-[450px] p-2">
                <CardHeader className="flex justify-between">
                    <div className="flex">
                        <UserCircle2 size={20} className="mr-1"/> 
                        <Link href={`/profile/${post.user.username}`} className="text-sm text-black hover:text-blue-500 hover:underline">{post.user.username}</Link>
                    </div>
                    {username === post.user.username && (
                        <Popover isOpen={isPopover} onOpenChange={(open) => setIsPopOver(open)}>
                            <PopoverTrigger className="p-1 rounded-full hover:cursor-pointer hover:bg-slate-200">
                                <EllipsisVertical size={25} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col gap-1">
                                    <Button onPress={() => {
                                        onOpenConfirm()
                                        setIsPopOver(false)
                                    }} variant="light" className="text-sm flex justify-start">
                                        <Trash2 size={20} color="#ff0000" />
                                        Delete
                                    </Button>
                                    <Button onPress={() => {
                                        onOpen()
                                        setIsPopOver(false)
                                    }} variant="light" className="text-sm flex justify-start">
                                        <Pencil size={20} color="#ffa500" />
                                        Edit
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
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
                        <MessageCircle onClick={onCommentOpen} className="hover:cursor-pointer" size={25}/>
                    </div>
                </CardFooter>
            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
                        <ModalBody>
                            <Textarea
                            onChange={({target}) => setContent(target.value)}
                            isRequired
                            defaultValue={post.content}
                            placeholder="Write here..."
                            isInvalid={error.post.status}
                            errorMessage={error.post.message}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" onPress={() => handleUpdatePost(onClose)}>
                            Update
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenConfirm} onOpenChange={onOpenConfirmChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader></ModalHeader>
                        <ModalBody>
                            <div className="font-semibold text-xl p-2 text-center">
                            Are you sure to delete?
                            </div>
                        </ModalBody>
                        <Divider/>
                        <ModalFooter>
                            <Button color="danger" size="sm" onPress={onClose}>
                            Cancel
                            </Button>
                            <Button color="primary" size="sm" onPress={() => {
                                handleDeletePost()
                                onClose()
                            }}>
                            Yes, delete it!
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal className="m-0" isOpen={isCommentOpen} onOpenChange={onCommentOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Comments on {post.user.username}'s post</ModalHeader>
                        <ModalBody>
                            <div className="max-h-[400px] space-y-2 overflow-y-auto">
                                {post.Comment.length != 0 ? (
                                    post.Comment.map((comment, i) => {
                                        if (username === comment.user.username) {
                                            return (
                                                <PopoverCommentItem comment={comment} key={i}/>
                                            )
                                        } else {
                                            return (
                                                <CommentItem comment={comment} key={i}/>
                                            )
                                        }
                                    })
                                ) : (
                                    <div className="text-center">No Comments</div>
                                )}
                            </div>
                        </ModalBody>
                        <Divider/>
                        <ModalFooter>
                            <Input
                            onChange={({target}) => setCommentContent(target.value)}
                            value={commentContent}
                            placeholder="Write comment..."
                            isInvalid={error.comment.status}
                            errorMessage={error.comment.message}
                            endContent={
                                <Button onPress={handleAddComment} size="sm" variant="light" className="text-blue-600">Send</Button>
                            }
                            />
                        </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}