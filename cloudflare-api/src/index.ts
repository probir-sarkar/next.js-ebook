import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { getDb } from '@/db'
import { subscribe } from '@/db/schema'
import { and, eq, gt, lt } from 'drizzle-orm'
export { NextJSEbookWorkflow } from './workflows'
const app = new Hono<{ Bindings: CloudflareBindings }>()
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('website'),
  interests: z.array(z.string()).optional().default([]),
  preferredFormat: z.enum(['pdf', 'epub', 'both']).optional().default('pdf'),
})
app.post('/subscribe', zValidator('json', subscribeSchema), async (c) => {
  const { email } = c.req.valid('json')
  const db = getDb(c.env)
  const id = crypto.randomUUID();
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const existingEmail = await db.select().from(subscribe).where(and(eq(subscribe.email, email), gt(subscribe.emailSent, twentyFourHoursAgo))).limit(1)
  if (existingEmail.length > 0) {
    return c.json({ success: false, message: 'Email already sent, please check your inbox or wait 24 hours' })
  }
  await db.insert(subscribe).values({ email }).onConflictDoNothing().returning()
  await c.env.WORKFLOW.create({
    params: {
      email
    },
    id
  },)
  return c.json({ success: true, message: 'Email sent successfully', id })
})

export default app
