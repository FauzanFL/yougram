import db from "@/lib/db"
import { PostCard } from "./PostCard"

export const Post = async ({username}: { username: string}) => {
    const posts = await db.post.findMany({orderBy: {createdAt: "desc"}, include: {user: true, Comment: {include: {user: true}}}})
    return (
        <div className="md:h-[100dvh] overflow-y-auto p-5">
            {!posts || posts.length !== 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {posts.map((post: any, i:number) => (
                        <PostCard post={post} username={username} key={i}/>
                    ))}
                </div>
            ): (
                <div className="text-center">
                    No data available
                </div>
            )}
        </div>
    )
}