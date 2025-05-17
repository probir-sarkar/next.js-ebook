import { db } from "@/db/index.ts";
import { emailSentLog, subscribe } from "@/db/schema.ts";
import { eq } from "drizzle-orm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { render } from "@react-email/components";
import { NextJsEbookDownload } from "../templates/NextJsEbookDownload.tsx";
import axios from "axios";
import { inngest } from "./client.ts";
import nodemailer, { SendMailOptions } from "nodemailer";
// Read from Deno.env
const smtpHost = Deno.env.get("SMTP_HOST");
const smtpPort = Number(Deno.env.get("SMTP_PORT"));
const smtpUser = Deno.env.get("SMTP_USER");
const smtpPass = Deno.env.get("SMTP_PASS");
const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
// Constants
const EBOOK_NAME =
  "Next.js Interview Guide - 100+ Questions and Answers to Succeed.pdf";
const EBOOK_BUCKET = "nextjs-ebook";
const URL_EXPIRATION_SECONDS = 60 * 60 * 24 * 3; // 3 days

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${Deno.env.get("ACCOUNT_ID")}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: Deno.env.get("S3_ACCESS_KEY_ID")!,
    secretAccessKey: Deno.env.get("S3_SECRET_ACCESS_KEY")!,
  },
});

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export const sendEmail = inngest.createFunction(
  { id: "send-email" },
  { event: "subscriptions/send.email" },
  async ({ event, step }) => {
    // Step 1: Generate Signed URL for the Ebook
    const signedUrl = await step.run("get signed url", async () => {
      return await getSignedUrl(
        S3,
        new GetObjectCommand({
          Bucket: EBOOK_BUCKET,
          Key: EBOOK_NAME,
        }),
        {
          expiresIn: URL_EXPIRATION_SECONDS, // 3 days
        }
      );
    });

    // Step 2: Update the database if email exists
    const updateStatus = await step.run("update database", async () => {
      const result = await db
        .select()
        .from(subscribe)
        .where(eq(subscribe.email, event.data.email))
        .limit(1);

      if (result.length > 0) {
        await db.insert(emailSentLog).values({
          subscribeId: result[0].id,
          emailSent: new Date(),
        });
        return "success";
      }
      return "not_found";
    });
    // Step 3: Send the email if the email is in the database
    if (updateStatus === "success") {
      await step.run("send email", async () => {
        try {
          const emailHtml = await render(
            <NextJsEbookDownload name="Probir" downloadLink={signedUrl} />
          );
          const mailOptions: SendMailOptions = {
            from: `Next.js Ebook <${smtpUser}>`,
            to: event.data.email,
            subject: "Download Next.js Ebook",
            html: emailHtml,
          };
          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully");
          return true;
        } catch (error) {
          console.error("Email sending failed:", error);
          return false;
        }
      });
    }
  }
);
