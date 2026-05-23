
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";

import { usersTable } from "./user";

export const formVisibilityEnum = pgEnum("form_visibility_enum", ["PUBLIC", "UNLISTED", "PRIVATE"]);

export const formsTable = pgTable("forms", {

  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 64 }).notNull(),

  description: varchar("description", { length: 300 }),

  visibility: formVisibilityEnum("visibility").default("UNLISTED").notNull(),

  allowEmbed: boolean("allow_embed").default(true).notNull(),

  isPasswordProtected: boolean("is_password_protected").default(false).notNull(),

  passwordHash: text("password_hash"),

  publishedAt: timestamp("published_at").defaultNow(),

  expiryDate: timestamp("expiry_date"),

  responseLimit: integer("response_limit"),

  createdBy: uuid("created_by").references(() => usersTable.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});