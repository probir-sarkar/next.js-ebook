import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { getDb } from '@/db'
import { subscribe } from '@/db/schema'


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
  const result = await db.insert(subscribe).values({ email }).returning()
  return c.json({ result })
})

export default app
