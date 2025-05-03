"use server";

import { nanoid } from "nanoid";
import { createAuthClient } from "./jwt"; // adjust path
import { getUser } from "@civic/auth-web3/nextjs";
import { attendeeInsertSchema, CreateEventFormValues } from "../validations";

export async function createEvent(data: CreateEventFormValues) {
  const supabase = await createAuthClient();
  const user = await getUser();

  const { data: insertedData, error } = await supabase.from("events").insert({
    name: data.name,
    description: data.description,
    location: data.location,
    created_by: user?.id,
    uuid: nanoid(18),
  });

  if (error) throw new Error(error.message);

  return insertedData;
}

export async function registerAttendee(event_id: string) {
  const user = await getUser();
  if (!user) throw new Error("User not authenticated");

  const supabase = await createAuthClient();

  const parsed = attendeeInsertSchema.parse({
    event_id,
    user_id: user.id,
    name: user.name,
    email: user.email,
  });

  const { data: inserted } = await supabase
    .from("attendees")
    .insert(parsed)
    .select()
    .single();

  return inserted;
}
