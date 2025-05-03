/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

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
import { UserButton } from "@civic/auth-web3/react";
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
      return await registerAttendee(id);
    },
    onSuccess: () => {
      toast.success("You have registered successfully!");
      queryClient.invalidateQueries({
        queryKey: [`event-${id}`, "is_registered", "attendees"],
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
        <UserButton className="w-2 h-12" />
      )}
    </div>
  );
}
