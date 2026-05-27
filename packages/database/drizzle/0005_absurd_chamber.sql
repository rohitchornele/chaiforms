ALTER TABLE "forms" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_slug_unique" UNIQUE("slug");