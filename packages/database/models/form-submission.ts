import {
  pgTable,
  uuid,
  timestamp,
  json,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";

export type FormSubmissionValues = Record<string, string>;

export const submissionStatusEnum = pgEnum(
  "submission_status",
  [
    "PENDING",
    "COMPLETED",
    "REJECTED",
    "SPAM",
  ]
);

export const formSubmissionTable = pgTable(
  "form_submissions",
  {

    id: uuid("id").primaryKey().defaultRandom(),

    formId: uuid("form_id").notNull().references(() => formsTable.id),

    submittedBy: uuid("submitted_by"),

    responses: json("responses").$type<FormSubmissionValues>().notNull(),

    ipAddress: text("ip_address"),

    userAgent: text("user_agent"),

    status: submissionStatusEnum("status").default("PENDING").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  }
);