import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'sqlite',
    out: './drizzle/migrations',
    schema: './src/db/schema.ts',

    dbCredentials: {
        url: `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/e902bb347189d5267aa70e55ec0fad804f9560f829f2a9bc073fc29b7b3bddf2.sqlite`,
    },
});