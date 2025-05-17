import {
  sqliteTable,
  integer,
  text,
  foreignKey,
} from "drizzle-orm/sqlite-core";

export const subscribe = sqliteTable("subscribe", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull(),
});

export const emailSentLog = sqliteTable(
  "email_sent_log",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    subscribeId: integer("subscribe_id"),
    emailSent: integer("email_sent", { mode: "timestamp" }),
  },
  (table) => [
    foreignKey({
      columns: [table.subscribeId],
      foreignColumns: [subscribe.id],
    }),
  ]
);