import { User } from "@/utils/structure"
import { Card, CardBody, Link } from "@nextui-org/react"
import { UserCircle } from "lucide-react"

export const UserCard = ({user}: {user: User}) => {
    return (
        <>
        <Card href={`/profile/${user.username}`} as={Link}>
            <CardBody>
                <div className="flex">
                    <UserCircle size={25} /> 
                    <span className="ml-2">{user.username}</span>
                </div>
            </CardBody>
        </Card>
        </>
    )
}