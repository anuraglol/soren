import CreateEventDialog from "@/components/create-event";
import { Events } from "@/components/events";
import { withAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase";
import { fetchEvents } from "@/lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const user = await withAuth();
  const supabase = await createClient();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: async () => await fetchEvents(supabase, user?.id),
  });

  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] p-10 flex justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-6 w-full max-w-3xl items-center my-24">
          <div className="w-full max-w-3xl flex justify-between items-center">
            <p>Hello, {user.name?.split(" ")[0]}</p>

            <CreateEventDialog />
          </div>

          <Events />
        </div>
      </HydrationBoundary>
    </div>
  );
}
