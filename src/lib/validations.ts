import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  image: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, {
    message: "Image must be less than 5MB",
  }),
  // date: z.string(),
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
  image_url: z.string().optional(),
  // date: z.string(),
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
  email?: string;
  id: string;
  idToken?: string;
};
