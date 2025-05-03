import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

type Bindings = {
  DB: D1Database
}

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('website'),
  interests: z.array(z.string()).optional().default([]),
  preferredFormat: z.enum(['pdf', 'epub', 'both']).optional().default('pdf'),
})

app.post('/subscribe', zValidator('json', subscribeSchema), (c) => {
  const { email } = c.req.valid('json')
  return c.json({ email })
})

export default app
