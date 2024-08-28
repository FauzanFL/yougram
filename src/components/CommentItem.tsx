import { Comment } from "@/utils/structure"

export const CommentItem = ({comment}: {comment: Comment}) => {
    return (
        <div className="p-2 space-y-1 bg-gray-100 rounded-md">
            <div className="font-semibold">{comment.user.username}</div>
            <div className="text-sm">{comment.content}</div>
        </div>
    )
}