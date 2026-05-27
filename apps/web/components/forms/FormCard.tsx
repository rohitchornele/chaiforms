
import Link from "next/link";

import {
  FileText,
  Pencil,
  Share2,
  Settings,
  Eye,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

import { Form } from "~/types/form";

type Props = {
  form: Form;
};

export default function FormCard({
  form,
}: Props) {
  const date = new Date(
    form.createdAt
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/80 hover:shadow-xl">
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-zinc-300 via-zinc-500 to-zinc-300 opacity-70 dark:from-zinc-700 dark:via-zinc-400 dark:to-zinc-700" />

      <div className="flex h-full flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between">
          <StatusBadge
            status={form.status}
          />

          <span className="text-xs font-medium text-muted-foreground">
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {form.title}
        </h3>

        {/* Description */}
        {form.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {form.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          {/* Responses */}
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <FileText size={13} />
            {form.responseCount || 0}{" "}
            responses
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Edit */}
            <Link
              href={`/dashboard/forms/${form.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <Pencil size={14} />
            </Link>

            {/* Preview */}
            {/* <Link
              href={`/forms/${form.slug || form.id}`}
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <Eye size={14} />
            </Link> */}

            {/* Settings */}
            <Link
              href={`/dashboard/forms/${form.id}/settings`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <Settings size={14} />
            </Link>

            {/* Share */}
            {form.status !== "draft" && (
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
                <Share2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}