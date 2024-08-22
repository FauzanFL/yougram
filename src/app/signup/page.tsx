import { RegisterCard } from "@/components/RegisterCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouGram | Signup"
}

export default function SignUp() {
    return (
    <main className="flex justify-center items-center min-h-[100dvh] p-4">
      <RegisterCard/>
    </main>
    )
}