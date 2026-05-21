import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum
} from "drizzle-orm/pg-core";
import { numeric } from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { unique } from "drizzle-orm/pg-core";


export const fieldTypeEnum = pgEnum('field_type_enum', ['TEXT', 'NUMBER', 'EMAIL', 'YES_NO', 'PASSWROD'])


export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id").primaryKey().defaultRandom(),

  label: varchar("label", { length: 100 }).notNull(),
  labelKey : varchar("label_key", {length: 100}).notNull(),
  
  description: text('description'),
  placeholder: varchar('placeholder'),
  
  isRequired : boolean('is_required').default(false).notNull(),

  orderIndex :  numeric('order_index', { scale: 2}).notNull(),

  isPasswordProtected : boolean('is_password_protected').default(false),
  password : varchar('password'),

  publishDate : timestamp('start_date').defaultNow(),
  expiryDate : timestamp('expiry_date'),

  type : fieldTypeEnum('type').notNull(),

  formId : uuid('form_id').references(() => formsTable.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),

}, (table) => {
    return {
        uniqueFormIndex : unique().on(table.formId, table.orderIndex)
    }
});
