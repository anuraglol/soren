"use server";

import { nanoid } from "nanoid";
import { createAuthClient } from "./jwt"; // adjust path
import {
  attendeeInsertSchema,
  CivicUser,
  CreateEventFormValues,
} from "../validations";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createEvent(data: CreateEventFormValues, userId: string) {
  const supabase = await createAuthClient(userId);
  const uuid = nanoid(18);
  const d = await uploadEventImage(data.image, uuid, supabase, userId!);

  const baseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/";

  const { data: insertedData, error } = await supabase.from("events").insert({
    name: data.name,
    description: data.description,
    location: data.location,
    created_by: userId,
    uuid,
    image_url: baseUrl + d.fullPath,
  });

  if (error) throw new Error(error.message);

  return insertedData;
}

export async function registerAttendee(event_id: string, user: CivicUser) {
  const supabase = await createAuthClient(user.id);

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

export async function uploadEventImage(
  file: File,
  id: string,
  supabase: SupabaseClient,
  userId: string
) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${id}.${fileExt}`;

  const { error, data } = await supabase.storage
    .from("event-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error("Image upload failed");
  return data;
}
