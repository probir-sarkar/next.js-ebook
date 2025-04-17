import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

const app = new Hono()

// Init DynamoDB client
const dynamo = new DynamoDBClient({})

// Environment variable (injected by CDK)
const TABLE_NAME = process.env.EBOOK_SUBSCRIBERS_TABLE || 'nextjs-ebook-test'

// Define routes
app.get('/', (c) => c.text('Hello Hono!'))

app.post('/subscribe',
    zValidator('json', z.object({
        email: z.string().email()
    }))
    , async (c) => {
        const { email } = c.req.valid('json')
        const timestamp = new Date().toISOString()
        try {
            await dynamo.send(
                new PutItemCommand({
                    TableName: TABLE_NAME,
                    Item: marshall({
                        email,
                        timestamp
                    })
                })
            )

            return c.json({ message: 'Subscribed!', email: email })
        }
        catch (e) {
            console.error(e)
            return c.json({ message: 'Failed to subscribe', email: email }, 500)
        }
    })

// Lambda export
export const handler = handle(app)
export default app;