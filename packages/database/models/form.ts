import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";


export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("full_name", { length: 64 }).notNull(),
  description: varchar('description', {length : 300}),

  isPasswordProtected : boolean('is_password_protected').default(false),
  password : varchar('password'),

  publishDate : timestamp('start_date').defaultNow(),
  expiryDate : timestamp('expiry_date'),

  // responseLimit : number('response-limit').default(0),

  createdBy : uuid('created_by').references(() => usersTable.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
