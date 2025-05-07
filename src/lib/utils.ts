import { createBrowserClient } from "@supabase/ssr";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { SupabaseClient } from "@supabase/supabase-js";
import { attendeeSchema, eventsArraySchema, eventSchema } from "./validations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function fetchEvents(client: SupabaseClient, userId?: string) {
  const { data } = await client
    .from("events")
    .select("*")
    .eq("created_by", userId)
    .order("created_at", { ascending: false });

  try {
    return eventsArraySchema.parse(data);
  } catch (error) {
    throw new Error("Failed to parse events");
  }
}

export async function fetchEvent(client: SupabaseClient, uuid: string) {
  const { data } = await client
    .from("events")
    .select("*")
    .eq("uuid", uuid)
    .single();

  return eventSchema.parse(data);
}

export const IMAGE_URL =
  "https://res.cloudinary.com/dzheectoe/image/upload/v1744732405/ChatGPT_Image_Apr_15_2025_09_04_38_PM_1_tns5jy.jpg";

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;

  if (isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export async function fetchAttendeesByEvent(
  client: SupabaseClient,
  eventId: string
) {
  const { data } = await client
    .from("attendees")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  return z.array(attendeeSchema).parse(data);
}

export async function isUserRegistered(
  client: SupabaseClient,
  eventId: string,
  userId: string
): Promise<boolean> {
  const { data } = await client
    .from("attendees")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  return !!data;
}

export const BACKGROUND_IMAGE_URL =
  "https://res.cloudinary.com/dzheectoe/image/upload/v1746448063/k6yggcm76nxmkfrayvnt.svg";
