import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react"
import { HeartIcon, MessageCircle, UserCircle2 } from "lucide-react"

export const PostCard = () => {
    return (
        <>
            <Card className="md:w-[450px] p-2">
                <CardHeader className="flex">
                    <UserCircle2 size={20} className="mr-1"/> 
                    <p className="text-sm">username</p>
                </CardHeader>
                <Divider/>
                <CardBody className="py-3">Content</CardBody>
                <Divider/>
                <CardFooter>
                    <div className="flex gap-2">
                        <HeartIcon className="hover:cursor-pointer" size={25}/>
                        <MessageCircle className="hover:cursor-pointer" size={25}/>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}