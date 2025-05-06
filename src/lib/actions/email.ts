"use server";

import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { EmailTemplate } from "@/components/email";
import { CivicUser } from "../validations";

const EMAIL_ADDRESS = "sandwichsoren@gmail.com";

export const sendEmail = async (user: CivicUser) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const emailHtml = await render(
    EmailTemplate({
      userFirstname: user.name?.split(" ")[0] || "",
    })
  );

  const options = {
    from: EMAIL_ADDRESS,
    to: user.email,
    subject: "hello world",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};
