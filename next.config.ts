import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.split("://")[1]!,
      },
    ],
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID!,
});

export default withCivicAuth(nextConfig);
