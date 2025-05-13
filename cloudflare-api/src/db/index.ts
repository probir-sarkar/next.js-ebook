import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import * as schema from '@/db/schema';

export const getDb = (env: CloudflareBindings) => {
    const client = createClient({
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
    });
    return drizzle(client, { schema });
}

export type Db = ReturnType<typeof getDb>;