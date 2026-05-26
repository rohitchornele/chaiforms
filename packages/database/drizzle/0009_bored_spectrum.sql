ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DEFAULT 'PENDING'::text;--> statement-breakpoint
DROP TYPE "public"."submission_status";--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('PENDING', 'COMPLETED');--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"public"."submission_status";--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "status" SET DATA TYPE "public"."submission_status" USING "status"::"public"."submission_status";