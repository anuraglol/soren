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
    ],
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "0618ed43-79e6-4c51-bbd9-1d7973e7cffb",
});

export default withCivicAuth(nextConfig);
