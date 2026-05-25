CREATE TYPE "public"."form_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVE');--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "status" "form_status_enum" DEFAULT 'DRAFT' NOT NULL;