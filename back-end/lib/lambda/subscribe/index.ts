// lambda/subscribe/index.ts
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { z } from 'zod';
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

const subscriptionSchema = z.object({
  email: z.string().email(),
  source: z.string().optional().default('website'),
  interests: z.array(z.string()).optional().default([]),
  preferredFormat: z.enum(['pdf', 'epub', 'both']).optional().default('pdf'),
});

const dynamodb = new DynamoDBClient({});
const tableName = process.env.EBOOK_SUBSCRIBERS_TABLE!;

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  if (!event.body) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Missing request body' }),
    };
  }

  try {
    const result = subscriptionSchema.safeParse(JSON.parse(event.body));

    if (!result.success) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Invalid request data',
          errors: result.error.format(),
        }),
      };
    }

    const { email, source, interests, preferredFormat } = result.data;
    const timestamp = new Date().toISOString();

    const subscriber = {
      email,
      timestamp,
      source,
      interests,
      preferredFormat,
      subscriptionStatus: 'PENDING_CONFIRMATION',
      subscriptionDate: timestamp,
      ttl: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
    };

    const params: PutItemCommandInput = {
      TableName: tableName,
      Item: marshall(subscriber),
      ConditionExpression: 'attribute_not_exists(email)',
    };

    await dynamodb.send(new PutItemCommand(params));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Successfully subscribed to Next.js Ebook updates',
        data: {
          email: subscriber.email,
          subscriptionStatus: subscriber.subscriptionStatus,
          subscriptionDate: subscriber.subscriptionDate,
        },
      }),
    };
  } catch (error: any) {
    if (
      error.name === 'ConditionalCheckFailedException' ||
      error.$metadata?.httpStatusCode === 400
    ) {
      return {
        statusCode: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'This email is already subscribed' }),
      };
    }

    console.error('Subscription error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to process subscription request' }),
    };
  }
}
