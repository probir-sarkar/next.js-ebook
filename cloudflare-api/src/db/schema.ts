import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const subscribe = sqliteTable('subscribe', {
    id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    source: text('source').notNull().default('website'),
    preferredFormat: text('preferred_format').notNull().default('pdf'),
});