import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getDb } from "@/db";
import { emailSentLog, subscribe } from "@/db/schema";
import { and, eq, gt, lt } from "drizzle-orm";
import { cors } from "hono/cors";
import axios from "axios";
export { NextJSEbookWorkflow } from "./workflows";
const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.CORS_ORIGIN,
  });
  return corsMiddlewareHandler(c, next);
});
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
    const db = getDb(c.env);
    const id = crypto.randomUUID();
    const ip = c.req.header("CF-Connecting-IP");

    // 1. Check if email has been sent in the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - TWENTY_FOUR_HOURS_MS);
    const sentCount = await db
      .select()
      .from(emailSentLog)
      .leftJoin(subscribe, eq(emailSentLog.subscribeId, subscribe.id))
      .where(gt(emailSentLog.emailSent, twentyFourHoursAgo))
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
        secret: c.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
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

    // 4. Trigger workflow
    try {
      await c.env.WORKFLOW.create({
        params: { email, ip },
        id,
      });
    } catch (err) {
      console.error("Workflow creation failed:", err);
      return c.json(
        { success: false, message: "Failed to process your request" },
        500
      );
    }

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

export type AppType = typeof route;
export default app;
