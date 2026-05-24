"use client";

import { useState } from "react";
import { Plus, X, Search, FileText, Share2, Pencil, AlertCircle } from "lucide-react";
import { useCreateForm, useListForm } from "~/hooks/api/form";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────
type Form = {
  id: string;
  title: string;
  description?: string;
  createdAt: string | Date;
  status?: "draft" | "published" | "archived";
  responseCount?: number;
};

// ── Skeleton ───────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
      <div className="h-5 w-3/5 rounded bg-gray-200" />
      <div className="h-4 w-4/5 rounded bg-gray-100" />
      <div className="h-4 w-2/5 rounded bg-gray-100" />
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
          <div className="h-8 w-8 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="rounded-2xl bg-gray-100 p-5">
        <FileText size={36} className="text-gray-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">No forms yet</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          Create your first form and start collecting responses.
        </p>
      </div>
      <button
        onClick={onOpen}
        className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        <Plus size={16} />
        Create a Form
      </button>
    </div>
  );
}

// ── Form Card ──────────────────────────────────────────────────────────────────
function FormCard({ form }: { form: Form }) {
  const statusStyle: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700",
    draft: "bg-amber-50 text-amber-700",
    archived: "bg-gray-100 text-gray-500",
  };
  const status = form.status ?? "draft";
  const date = new Date(form.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-3 transition hover:border-gray-400 hover:shadow-md cursor-pointer">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${statusStyle[status]}`}
        >
          {status}
        </span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      <h3 className="font-semibold text-gray-900 text-base leading-snug">{form.title}</h3>

      {form.description && <p className="text-sm text-gray-500 line-clamp-2">{form.description}</p>}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <FileText size={13} />
          {form.responseCount ?? 0} responses
        </span>
        <div className="flex gap-1.5">
          {/* <button
            onClick={(e) => e.stopPropagation()}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-gray-400 hover:text-gray-700"
            aria-label="Edit"
          >
            <Pencil size={13} />
          </button> */}
          <Link
            href={`/dashboard/forms/${form.id}`}
            onClick={(e) => e.stopPropagation()}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-gray-400 hover:text-gray-700"
            aria-label="Edit"
          >
            <Pencil size={13} />
          </Link>
          <button
            onClick={(e) => e.stopPropagation()}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-gray-400 hover:text-gray-700"
            aria-label="Share"
          >
            <Share2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function FormsPage() {
  // Modal state
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // List state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "archived">("all");

  // Hooks
  const { createFormAsync, status: createStatus } = useCreateForm();
  const { forms, isLoading, isFetching, error } = useListForm();

  const isCreating = createStatus === "pending";

  const handleCreateForm = async () => {
    if (!title.trim()) return;
    try {
      await createFormAsync({ title, description });
      setTitle("");
      setDescription("");
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = (forms as Form[] | undefined)?.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || f.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 lg:px-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  Forms
                  {isFetching && !isLoading && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-black animate-pulse align-middle" />
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">Manage and share all your forms.</p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Plus size={16} />
                Create Form
              </button>
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
              {/* Search */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search forms…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-4 py-2 text-sm outline-none transition focus:border-gray-400"
                />
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1 rounded-lg border border-gray-200 bg-white p-1">
                {(["all", "published", "draft", "archived"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                      filter === f
                        ? "bg-black text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Count */}
              {!isLoading && (
                <span className="ml-auto text-xs text-gray-400">
                  {filtered?.length ?? 0} form{filtered?.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* ── Error ── */}
            {error && (
              <div className="mx-4 lg:mx-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={15} />
                Failed to load forms — {error.message}
              </div>
            )}

            {/* ── Grid ── */}
            <div className="px-4 lg:px-6">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : !error && (!filtered || filtered.length === 0) ? (
                <EmptyState onOpen={() => setOpen(true)} />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered?.map((form) => (
                    <FormCard key={form.id} form={form} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Create Form Modal ── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-black/30 shadow-xl border border-white/30">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/30 p-5">
              <div>
                <h3 className="text-xl font-semibold">Create New Form</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Fill the details below to create a form.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 transition hover:bg-gray-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Form Title</label>
                <input
                  type="text"
                  placeholder="Enter form title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 px-4 py-3 outline-none transition focus:border-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter form description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-600 px-4 py-3 outline-none transition focus:border-white"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t p-5">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:border-red-500 hover:text-red-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateForm}
                disabled={isCreating || !title.trim()}
                className="cursor-pointer rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating ? "Creating..." : "Create Form"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
