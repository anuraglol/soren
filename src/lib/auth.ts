"use server";

import { getUser } from "@civic/auth-web3/nextjs";
import { redirect } from "next/navigation";

export const withAuth = async () => {
  const user = await getUser();

  if (user) {
    return user;
  } else {
    redirect("/");
  }
};
