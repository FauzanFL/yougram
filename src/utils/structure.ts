export interface User {
    username: string
    email: string
}

export interface Post {
    id: number
    content: string
    likeCount: number
    userId: number
    user: User
    Comment: Comment[]
    createdAt: object
    updatedAt: object
}

export interface Comment {
    id: number
    content: string
    user: User
    userId: number
    postId: number
}

export interface InputError {
    status: boolean
    message: string
}