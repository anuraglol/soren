"use client";

import { useUser, UserButton } from "@civic/auth-web3/react";
import { ShimmerButton } from "./magicui/shimmer-button";
import { Loader2 } from "lucide-react";

export const SignInButton = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="relative">
      <ShimmerButton
        shimmerColor="#c084fc"
        shimmerSize="0.08em"
        shimmerDuration="2s"
        className="shadow-2xl cursor-pointer w-full"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="animate-spin mr-2 text-white" />}
        <span className="whitespace-pre-wrap text-center text-2xl py-3 px-6 font-medium leading-none tracking-tight text-white dark:text-white lg:text-lg">
          {user ? "Go to App" : "Get Started"}
        </span>
      </ShimmerButton>

      <UserButton
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0,
        }}
      />
    </div>
  );
};
