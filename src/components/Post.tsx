import { PostCard } from "./PostCard"

export const Post = () => {
    return (
        <div className="md:h-[100dvh] overflow-y-auto p-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
        </div>
    )
}