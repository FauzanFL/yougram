import { Button } from "@nextui-org/react"
import { SquarePen } from "lucide-react"

export const ButtonCreatePost = () => {
    return (
        <Button size="sm" className="p-1" radius="full"><SquarePen size={25}/></Button>
    )
}