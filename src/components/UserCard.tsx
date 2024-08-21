import { Card, CardBody, Link } from "@nextui-org/react"
import { UserCircle } from "lucide-react"

export const UserCard = () => {
    return (
        <>
        <Card href={"/profile"} as={Link}>
            <CardBody>
                <div className="flex">
                    <UserCircle size={25} /> 
                    <span className="ml-2">username</span>
                </div>
            </CardBody>
        </Card>
        </>
    )
}