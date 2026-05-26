CREATE TYPE "public"."submission_status" AS ENUM('PENDING', 'COMPLETED', 'REJECTED', 'SPAM');--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "form_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "form_submissions" DROP COLUMN "values";