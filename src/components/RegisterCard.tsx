"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react"
import Link from "next/link"

export const RegisterCard = () => {
    return (
        <>
        <Card className="p-4 w-full md:w-[400px] lg:w-[600px]">
            <CardHeader className="flex flex-col items-start">
                <div className="text-2xl font-bold">Sign Up</div>
                <p className="mt-1 text-sm">Join our community!</p>
            </CardHeader>
            <CardBody className="">
                <form>
                    <Input className="mb-2" label="Name" type="text" />
                    <Input className="mb-2" label="Email" type="email" />
                    <Input className="mb-2" label="Username" type="text" />
                    <Input className="mb-2" label="Password" type="password" />
                    <Input className="mb-2" label="Confirm Password" type="password" />
                    <div className="mt-2 flex justify-center items-center">
                        <Button size="md" color="primary">Sign Up</Button>
                    </div>
                </form>
            </CardBody>
            <CardFooter className="text-sm flex justify-center items-center">{"Have an account? "}
            <Link href={"/login"} className="ml-1 text-blue-500 hover:underline">Log In</Link>
            </CardFooter>
        </Card>
        </>
    )
}