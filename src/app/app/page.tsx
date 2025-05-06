import CreateEventDialog from "@/components/create-event";
import { Events } from "@/components/events";
import { createClient } from "@/lib/supabase";
import { fetchEvents } from "@/lib/utils";
import { getUser } from "@civic/auth-web3/nextjs";
import { UserButton } from "@civic/auth-web3/react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const user = await getUser();
  const supabase = await createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: async () => await fetchEvents(supabase, user?.id),
  });

  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] px-10 py-2 flex justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-6 w-full max-w-3xl items-center my-24">
          <div className="w-full max-w-3xl flex justify-between items-center">
            <p>Hello, {user ? user.name?.split(" ")[0] : "Unkown Wanderer"}</p>

            {user ? (
              <CreateEventDialog />
            ) : (
              <UserButton className="cursor-pointer text-md inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-white shadow-xs hover:bg-primary/90" />
            )}
          </div>
          {user && <Events />}{" "}
        </div>
      </HydrationBoundary>
    </div>
  );
}
