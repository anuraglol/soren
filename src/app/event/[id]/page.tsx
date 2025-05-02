import { Metadata } from "@/components/metadata";
import { createClient } from "@/lib/supabase";
import { fetchEvent } from "@/lib/utils";
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

  await queryClient.prefetchQuery({
    queryKey: [`event-${id}`],
    queryFn: async () => await fetchEvent(supabase, id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] p-32 mx-auto text-neutral-300">
        <Metadata />
      </div>
    </HydrationBoundary>
  );
}
