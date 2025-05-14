import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getDb } from "@/db";
import { subscribe } from "@/db/schema";
import { and, eq, gt, lt } from "drizzle-orm";
import { cors } from "hono/cors";
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
const route = app.post(
  "/subscribe",
  zValidator("json", subscribeSchema),
  async (c) => {
    const { email, token } = c.req.valid("json");
    // Validate Turnstile Token
    const ip = c.req.header("CF-Connecting-IP");
    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const result = await fetch(url, {
      body: JSON.stringify({
        secret: c.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const outcome: any = await result.json();
    if (!outcome.success) {
      return c.json(
        { success: false, message: "Invalid Turnstile Token" },
        400
      );
    } else {
      return c.json({ success: true, message: "Turnstile Token Valid" });
    }

    const db = getDb(c.env);
    const id = crypto.randomUUID();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingEmail = await db
      .select()
      .from(subscribe)
      .where(
        and(
          eq(subscribe.email, email),
          gt(subscribe.emailSent, twentyFourHoursAgo)
        )
      )
      .limit(1);
    if (existingEmail.length > 0) {
      return c.json(
        {
          success: false,
          message:
            "Email already sent, please check your inbox or wait 24 hours",
        },
        400
      );
    }
    await db
      .insert(subscribe)
      .values({ email })
      .onConflictDoNothing()
      .returning();
    await c.env.WORKFLOW.create({
      params: {
        email,
      },
      id,
    });
    return c.json(
      { success: true, message: "Email sent successfully", id },
      200
    );
  }
);

export type AppType = typeof route;
export default app;
