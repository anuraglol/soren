import { Metadata } from "@/components/metadata";
import { createClient } from "@/lib/supabase";
import { fetchEvent, isUserRegistered } from "@/lib/utils";
import { getUser } from "@civic/auth-web3/nextjs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const queryClient = new QueryClient();
  const user = await getUser();

  await queryClient.prefetchQuery({
    queryKey: [`event-${id}`],
    queryFn: async () => await fetchEvent(supabase, id),
  });

  await queryClient.prefetchQuery({
    queryKey: ["is_registered"],
    queryFn: async () => await isUserRegistered(supabase, id, user?.id!),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-32 mx-auto text-neutral-300">
        <Metadata user={user!} />
      </div>
    </HydrationBoundary>
  );
}
