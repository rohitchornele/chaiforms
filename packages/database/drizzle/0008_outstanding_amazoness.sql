ALTER TABLE "form_submissions" ADD COLUMN "responses" json NOT NULL;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "status" "submission_status" DEFAULT 'PENDING' NOT NULL;