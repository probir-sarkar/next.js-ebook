import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import nodemailer, { SendMailOptions } from "nodemailer";
import "jsr:@std/dotenv/load";
import { db } from "@/db/index.ts";
import { emailSentLog, subscribe } from "@/db/schema.ts";
import { and, eq, gt, lt } from "drizzle-orm";
import { serve } from "https://esm.sh/inngest@3.36.0/hono";
import axios from "axios";
import { functions } from "@/inngest/index.ts";
import { inngest } from "@/inngest/client.ts";
// Schema for email validation
const emailSchema = z.object({
  senderName: z.string().optional(),
  receiver: z.string().email(),
  subject: z.string(),
  body: z.string(),
});

// Read from Deno.env
const smtpHost = Deno.env.get("SMTP_HOST");
const smtpPort = Number(Deno.env.get("SMTP_PORT"));
const smtpUser = Deno.env.get("SMTP_USER");
const smtpPass = Deno.env.get("SMTP_PASS");
const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");

const app = new Hono();
app.on(
  ["GET", "PUT", "POST"],
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

const subscribeSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1, "Please verify you are not a robot"),
});

// Constants
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const MAX_EMAILS_PER_DAY = 3;
const route = app.post(
  "/subscribe",
  zValidator("json", subscribeSchema),
  async (c) => {
    const { email, token } = c.req.valid("json");
    const id = crypto.randomUUID();

    // 1. Check if email has been sent in the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - TWENTY_FOUR_HOURS_MS);
    const sentCount = await db
      .select()
      .from(emailSentLog)
      .leftJoin(subscribe, eq(emailSentLog.subscribeId, subscribe.id))
      .where(
        and(
          gt(emailSentLog.emailSent, twentyFourHoursAgo),
          eq(subscribe.email, email)
        )
      )
      .all();
    if (sentCount.length > MAX_EMAILS_PER_DAY) {
      return c.json(
        {
          success: false,
          message:
            "Email already sent, please check your inbox or wait 24 hours",
        },
        400
      );
    }
    // 2. Validate Turnstile Token
    const turnstileResponse = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        secret: turnstileSecret,
        response: token,
      }
    );
    if (!turnstileResponse.data.success) {
      return c.json(
        { success: false, message: "Invalid Turnstile Token" },
        400
      );
    }

    // 3. Insert subscription (if not exists)
    try {
      await db
        .insert(subscribe)
        .values({ email })
        .onConflictDoNothing()
        .returning();
    } catch (err) {
      console.error("Subscription insert failed:", err);
      // Continue anyway - might be a duplicate
    }
    // 4. Insert email sent log
    await inngest.send({
      name: "subscriptions/send.email",
      data: {
        email: email,
      },
    });
    return c.json(
      {
        success: true,
        message: "Subscription processed successfully",
        id,
      },
      201 // Created
    );
  }
);

app.post("/send-email", zValidator("json", emailSchema), async (c) => {
  const { senderName, receiver, subject, body } = c.req.valid("json");

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return c.text("Missing SMTP configuration.", { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions: SendMailOptions = {
    from: senderName ? `"${senderName}" <${smtpUser}>` : smtpUser,
    to: receiver,
    subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    return c.text("Email sent successfully!");
  } catch (err) {
    console.error(err);
    return c.text("Failed to send email.", { status: 500 });
  }
});

Deno.serve(app.fetch);
export type AppType = typeof route;
