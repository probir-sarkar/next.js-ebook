import {
  WorkflowEntrypoint,
  WorkflowEvent,
  WorkflowStep,
} from "cloudflare:workers";
import { getDb } from "@/db";
import { emailSentLog, subscribe } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextJsEbookDownload } from "../../../email-templates/emails/NextJsEbookDownload";

type Params = {
  email: string;
};

// Create your own class that implements a Workflow
export class NextJSEbookWorkflow extends WorkflowEntrypoint<
  CloudflareBindings,
  Params
> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    // S3 Configuration
    const S3 = new S3Client({
      region: "auto",
      endpoint: `https://${this.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.env.S3_ACCESS_KEY_ID,
        secretAccessKey: this.env.S3_SECRET_ACCESS_KEY,
      },
    });

    // Step 1: Generate Signed URL for the Ebook
    const signedUrl = await step.do("get signed url", async () => {
      return await getSignedUrl(
        S3,
        new GetObjectCommand({
          Bucket: "nextjs-ebook",
          Key: "Next.js Interview Guide - 100+ Questions and Answers to Succeed.pdf",
        }),
        {
          expiresIn: 60 * 60 * 24 * 3, // 3 days
        }
      );
    });

    // Step 2: Update the database if email exists
    const updateStatus = await step.do("update database", async () => {
      const db = getDb(this.env);
      const result = await db
        .select()
        .from(subscribe)
        .where(eq(subscribe.email, event.payload.email))
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
      await step.do("send email", async () => {
        try {
          const resend = new Resend(this.env.RESEND_TOKEN);
          await resend.emails.send({
            from: "Next.js Ebook <no-reply@probir.dev>",
            to: event.payload.email,
            subject: "Next.js Ebook",
            react: (
              <NextJsEbookDownload name="Probir" downloadLink={signedUrl} />
            ),
          });
          console.log("Email sent successfully");
          return true;
        } catch (error) {
          console.error("Email sending failed:", error);
          return false;
        }
      });
    }
  }
}
