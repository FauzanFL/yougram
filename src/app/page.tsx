import { WelcomeCard } from "@/components/WelcomeCard";
import { getSession } from "@/lib/sessionCookie";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession()
  if (session) redirect("/home")
  return (
    <main className="flex justify-center items-center min-h-[100dvh] p-4">
      <WelcomeCard/>
    </main>
  );
}
