"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  createClient,
  fetchEvent,
  IMAGE_URL,
  isUserRegistered,
} from "@/lib/utils";
import { SignInButton } from "@civic/auth-web3/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerAttendee } from "@/lib/actions/event";
import { CivicUser } from "@/lib/validations";

export function Metadata({ user }: { user: CivicUser }) {
  const { id } = useParams<{ id: string }>();
  const supabase = createClient();

  const { data } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: async () => await fetchEvent(supabase, id),
  });

  const is_admin = data?.created_by === user?.id;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await registerAttendee(id, user);
    },
    onSuccess: () => {
      toast.success("You have registered successfully!");
      queryClient.refetchQueries({
        queryKey: ["is_registered"],
      });
      queryClient.refetchQueries({
        queryKey: [`event-${id}`],
      });
    },
  });

  const { data: status } = useQuery({
    queryKey: ["is_registered"],
    queryFn: async () => await isUserRegistered(supabase, id, user?.id!),
  });

  return (
    <div className="max-w-3xl flex flex-col mx-auto gap-6">
      <div className="w-full relative h-[25rem] mx-auto">
        <Image
          src={data?.image_url || IMAGE_URL}
          alt="Event Image"
          layout="fill"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <p className="text-lg font-medium text-neutral-200">{data?.name}</p>
        <p>{data?.description}</p>
      </div>

      {user ? (
        <Button
          disabled={is_admin || status || mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          {is_admin ? (
            "You are the host"
          ) : status ? (
            "You have already registered"
          ) : (
            <>
              {mutation.isPending && <Loader2 className="mr-2 animate-spin" />}
              Register
            </>
          )}
        </Button>
      ) : (
        <SignInButton className="cursor-pointer text-md inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90" />
      )}

      {status && (
        <p className="font-medium text-center">
          You are registered for this event.
        </p>
      )}
    </div>
  );
}
