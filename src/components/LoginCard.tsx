"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import Link from "next/link"

export const LoginCard = () => {
    return (
        <>
        <Card className="w-full md:w-[400px] lg:w-[600px]">
            <CardHeader className="text-2xl font-bold">Log In</CardHeader>
            <CardBody className="">
                <form>
                    <Input className="mb-2" label="Username" type="text" />
                    <Input className="mb-2" label="Password" type="password" />
                    <div className="mt-2 flex justify-center items-center">
                        <Button size="md" color="primary">Log In</Button>
                    </div>
                </form>
            </CardBody>
            <CardFooter className="text-sm flex justify-center items-center">{"Don't have account? "}
                <Link href={"/"} className="ml-1 text-blue-500 hover:underline">Sign Up</Link>
            </CardFooter>
        </Card>
        </>
    )
}