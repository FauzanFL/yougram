import { LoginCard } from "@/components/LoginCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouGram | Login"
}

export default function Login() {
    return (
    <main className="flex justify-center items-center min-h-[100dvh] p-4">
      <LoginCard/>
    </main>
    )
}