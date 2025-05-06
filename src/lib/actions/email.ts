"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/email";
import { CivicUser } from "../validations";

export const sendEmail = async (user: CivicUser) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: user?.email!,
    subject: "Hello from Server Action",
    react: EmailTemplate({
      userFirstname: user?.name!,
    }),
  });

  if (res.error) {
    console.error("Error sending email:", res.error);
    throw new Error("Failed to send email");
  }
  console.log("Email sent successfully:", res);
  return res;
};
