CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."form_status_enum" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVE');--> statement-breakpoint
CREATE TYPE "public"."form_visibility_enum" AS ENUM('PUBLIC', 'UNLISTED', 'PRIVATE');--> statement-breakpoint
CREATE TYPE "public"."field_type_enum" AS ENUM('TEXT', 'NUMBER', 'EMAIL', 'YES_NO', 'PASSWORD');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('PENDING', 'COMPLETED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(80) NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"profile_image_url" text,
	"role" "user_role_enum" DEFAULT 'USER' NOT NULL,
	"salt" text,
	"password" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
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
CREATE TABLE "form_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" varchar(100) NOT NULL,
	"label_key" varchar(100) NOT NULL,
	"description" text,
	"placeholder" varchar,
	"is_required" boolean DEFAULT false NOT NULL,
	"order_index" numeric NOT NULL,
	"type" "field_type_enum" NOT NULL,
	"form_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "form_fields_form_id_order_index_unique" UNIQUE("form_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "form_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid NOT NULL,
	"responses" json NOT NULL,
	"status" "submission_status" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;