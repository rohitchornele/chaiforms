
CREATE TYPE "public"."form_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVE');--> statement-breakpoint

CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(64) NOT NULL,
	"description" varchar(300),
	"visibility" "form_visibility_enum" DEFAULT 'UNLISTED' NOT NULL,
	"allow_embed" boolean DEFAULT true NOT NULL,
	"is_password_protected" boolean DEFAULT false NOT NULL,
	"password_hash" text,
	"published_at" timestamp DEFAULT now(),
	"expiry_date" timestamp,
	"status" "form_status_enum" DEFAULT 'DRAFT' NOT NULL,
	"response_limit" integer,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);