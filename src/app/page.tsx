import CreateEventDialog from "@/components/create-event";
import { EventCard } from "@/components/event-card";
import { LoginForm } from "@/components/login";
import { Button } from "@/components/ui/button";
import { getUser } from "@civic/auth-web3/nextjs";
import { UserButton } from "@civic/auth-web3/react";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] p-10 flex justify-center">
      {user ? (
        <div className="w-full max-w-3xl flex justify-between items-center">
          <p>Hello, {user.name}</p>

          <CreateEventDialog />
        </div>
      ) : (
        <UserButton />
      )}
    </div>
  );
}
