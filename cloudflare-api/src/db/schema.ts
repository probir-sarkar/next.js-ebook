import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const subscribe = sqliteTable('subscribe', {
    email: text('email').notNull(),
    source: text('source').notNull().default('website'),
    interests: text('interests', { mode: 'json' }).notNull().$type<string[]>().default([]),
    preferredFormat: text('preferred_format').notNull().default('pdf'),
});