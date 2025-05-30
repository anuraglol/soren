"use client";

import { createClient, fetchEvents, formatDate, IMAGE_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  LinkIcon,
  MapPinIcon,
  TelescopeIcon,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@civic/auth-web3/react";
import { EventAttendeesDialog } from "./attendees";
import { useEffect } from "react";
import { userHasWallet } from "@civic/auth-web3";

export function Events() {
  const supabase = createClient();
  const userContext = useUser();
  const user = userContext.user;

  useEffect(() => {
    const createWalletIfNeeded = async () => {
      if (userContext.user && !userHasWallet(userContext)) {
        await userContext.createWallet();
      }
    };
    createWalletIfNeeded();

    return () => {};
  }, [userContext]);

  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => await fetchEvents(supabase, user?.id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl my-8 justify-items-center items-center justify-center gap-4">
      {data?.map((event) => (
        <Card
          key={event.id}
          className="overflow-hidden rounded-2xl shadow-md max-w-[22rem] w-full"
        >
          <div className="relative h-48 w-full">
            <Image
              src={event?.image_url || IMAGE_URL}
              alt="thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="text-foreground text-xl font-bold">{event.name}</p>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {formatDate(event.created_at)}
            </div>
            <Link
              href={`/event/${event.uuid}`}
              className="flex items-center gap-2 hover:text-rose-400"
              target="_blank"
              rel="noopener"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Visit</span>
            </Link>
            <div className="flex items-center gap-2 cursor-pointer hover:text-rose-400">
              <TelescopeIcon className="h-4 w-4" />
              <EventAttendeesDialog event={event} />
            </div>{" "}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
