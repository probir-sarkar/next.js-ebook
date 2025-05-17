import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema.ts";
import { createClient } from "@libsql/client";

const turso = createClient({
  url: Deno.env.get("TURSO_DATABASE_URL")!,
  authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
});
export const db = drizzle(turso, {
  schema,
});
