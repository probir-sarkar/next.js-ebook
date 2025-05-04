import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { getDb } from '@/db'
import { subscribe } from '@/db/schema'
import { eq } from 'drizzle-orm'
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
  // is email exists?
  const existingEmail = await db.select().from(subscribe).where(eq(subscribe.email, email)).limit(1)
  if (existingEmail.length > 0) {
    return c.json({ message: 'Email already exists' })
  }
  const result = await db.insert(subscribe).values({ email }).returning()
  const workFlow = await c.env.WORKFLOW.create({
    params: {
      email
    },
    id
  },)
  return c.json({ result, details: await workFlow.status(), })
})

export default app
