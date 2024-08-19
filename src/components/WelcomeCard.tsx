"use client"
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export const WelcomeCard = () => {
    const router = useRouter();
    return (
        <>
        <Card className="p-5">
            <CardHeader className="text-3xl">Welcome to <span className="font-bold ml-1">YouGram!</span></CardHeader>
            <CardBody className="px-8">
                <div className="py-3 flex flex-col text-center gap-2">
                    <p>Have Account!</p>
                    <Button onClick={() => router.push('/login')} size="sm" color="primary">
                        Log In
                    </Button>
                </div>
                <Divider/>
                <div className="py-3 flex flex-col text-center gap-2">
                    <p>{`Don't Have Account!`}</p>
                    <Button onClick={() => router.push('/signup')} size="sm" color="primary">
                        Sign Up
                    </Button>
                </div>
            </CardBody>
        </Card>
        </>
    )
}