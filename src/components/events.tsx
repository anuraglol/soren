"use client";

import { createClient, fetchEvents, formatDate, IMAGE_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { useUser } from "@civic/auth-web3/react";

export function Events() {
  const supabase = createClient();
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: async () => await fetchEvents(supabase, user?.id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="grid grid-cols-2 w-full max-w-4xl my-8 justify-between gap-4">
      {data?.map((event) => (
        <Card
          key={event.id}
          className="overflow-hidden rounded-2xl shadow-md max-w-[22rem] w-full"
        >
          <div className="relative h-48 w-full">
            <Image
              src={IMAGE_URL}
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
