"use server";

import jwt from "jsonwebtoken";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const jwtSecret = process.env.SUPABASE_JWT_SECRET!;

export const createAuthClient = async (userId: string) => {
  const token = jwt.sign(
    {
      sub: userId,
      role: "authenticated",
    },
    jwtSecret,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );
};
