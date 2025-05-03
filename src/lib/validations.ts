import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
});

export type CreateEventFormValues = z.infer<typeof createEventSchema>;

export const eventSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  description: z.string().optional(),
  location: z.string(),
  created_by: z.string(),
  uuid: z.string(),
});

export const eventsArraySchema = z.array(eventSchema);
export type Event = z.infer<typeof eventSchema>;

export const attendeeSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  event_id: z.string(),
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const attendeeInsertSchema = z.object({
  event_id: z.string(),
  user_id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export type Attendee = z.infer<typeof attendeeSchema>;
export type NewAttendee = z.infer<typeof attendeeInsertSchema>;

export type CivicUser = {
  name?: string;
  picture?: string;
  email: string;
  id: string;
  idToken: string;
};
