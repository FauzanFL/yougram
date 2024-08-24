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
    createdAt: object
    updatedAt: object
}