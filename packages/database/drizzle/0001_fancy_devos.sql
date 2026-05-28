CREATE TYPE "public"."form_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVE');--> statement-breakpoint
CREATE TYPE "public"."form_visibility_enum" AS ENUM('PUBLIC', 'UNLISTED', 'PRIVATE');--> statement-breakpoint
CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(64) NOT NULL,
	"slug" varchar(150) NOT NULL,
	"description" varchar(300),
	"visibility" "form_visibility_enum" DEFAULT 'UNLISTED' NOT NULL,
	"is_password_protected" boolean DEFAULT false NOT NULL,
	"password_hash" text,
	"published_at" timestamp,
	"expiry_date" timestamp,
	"status" "form_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"response_limit" integer,
	"response_count" integer DEFAULT 0 NOT NULL,
	"theme" text DEFAULT 'sacred-tech' NOT NULL,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "forms_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;