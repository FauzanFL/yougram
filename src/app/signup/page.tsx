import { RegisterCard } from "@/components/RegisterCard";
import { getSession } from "@/lib/sessionCookie";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "YouGram | Signup"
}

export default async function SignUp() {
  const session = await getSession()
    if (session) redirect("/home")
    return (
    <main className="flex justify-center items-center min-h-[100dvh] p-4">
      <RegisterCard/>
    </main>
    )
}