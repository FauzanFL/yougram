import { CircularProgress } from "@nextui-org/react"

export const SimpleLoading = () => {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="flex items-center gap-2 font-semibold">
                <CircularProgress strokeWidth={4} size="sm" color="primary" aria-label="Loading..."/>
                <span>Loading...</span>
            </div>
        </div>
    )
}