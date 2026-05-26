import Link from "next/link";

import { FileText, Pencil, Share2 } from "lucide-react";

import StatusBadge from "./StatusBadge";

import { Form } from "~/types/form";

type Props = {
  form: Form;
};

export default function FormCard({ form }: Props) {
  const date = new Date(form.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50/80 p-5 text-zinc-900 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-xl">
      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-zinc-300 via-zinc-500 to-zinc-300 opacity-70" />

      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <StatusBadge status={form.status} />

          <span className="text-xs font-medium text-zinc-500">{date}</span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-black">
          {form.title}
        </h3>

        {/* Description */}
        {form.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600">
            {form.description}
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4">
          {/* Responses */}
          <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
            <FileText size={13} />
            {form.responseCount || 0} responses
          </span>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/dashboard/forms/${form.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-zinc-400 hover:bg-zinc-100 hover:text-black"
            >
              <Pencil size={14} />
            </Link>

            {form.status !== "draft" && (
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-all hover:border-zinc-400 hover:bg-zinc-100 hover:text-black">
                <Share2 size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
