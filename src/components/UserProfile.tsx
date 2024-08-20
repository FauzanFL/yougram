import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react"
import { StickyNote } from "lucide-react"

export const UserProfile = () => {
    return (
        <>
            <Card className="p-4 max-w-[400px] mx-auto">
                <CardBody>
                    <div className="mb-2">
                        <div className="my-1">Username: <span className="font-semibold">username</span></div>
                        <div className="my-1">Name: <span className="font-semibold">John Doe</span></div>
                        <div className="my-1">Email: <span className="font-semibold">john@gmail.com</span></div>
                    </div>
                    <div className="flex justify-center items-center">
                        <Button size="sm" color="primary" variant="solid">Edit profile</Button>
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <div className="flex justify-center"><StickyNote className="mr-1" size={25}/><span className="font-semibold">3 posts</span></div>
                </CardFooter>
            </Card>
        </>
    )
}