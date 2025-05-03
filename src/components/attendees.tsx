"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createClient, fetchAttendeesByEvent } from "@/lib/utils";
import { Event } from "@/lib/validations";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function EventAttendeesDialog({ event }: { event: Event }) {
  const supabase = createClient();

  const { data: attendees } = useQuery({
    queryKey: ["attendees", event.uuid],
    queryFn: async () => {
      return await fetchAttendeesByEvent(supabase, event.uuid);
    },
    enabled: !!event.uuid,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>View Attendees</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Attendees</DialogTitle>
          <DialogDescription>
            Here are the users who have registered for this event.
          </DialogDescription>
        </DialogHeader>

        {attendees && attendees.length > 0 && (
          <ScrollArea className="max-h-64 space-y-4 pr-2">
            {attendees.length > 0 ? (
              attendees.map((attendee, index) => (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="text-lg font-medium">
                      {attendee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-md">
                    <p className="font-medium text-foreground">
                      {attendee.name}
                    </p>
                    <p className="text-muted-foreground">{attendee.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No attendees yet.</p>
            )}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
