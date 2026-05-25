"use client";

import { useState } from "react";
import {
  Plus,
  X,
  Search,
  FileText,
  Share2,
  Pencil,
  AlertCircle,
} from "lucide-react";

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
    <div className="animate-pulse space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded-full bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>

      <div className="h-5 w-3/5 rounded bg-gray-200" />
      <div className="h-4 w-4/5 rounded bg-gray-100" />
      <div className="h-4 w-2/5 rounded bg-gray-100" />

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="h-4 w-24 rounded bg-gray-200" />

        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-xl bg-gray-200" />
          <div className="h-9 w-9 rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────
function EmptyState({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/70 px-6 py-24 text-center shadow-sm">
      <div className="rounded-3xl bg-gray-100 p-6 shadow-inner">
        <FileText size={42} className="text-gray-400" />
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-semibold text-gray-900">
          No forms yet
        </h3>

        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Create your first form and start collecting responses from users.
        </p>
      </div>

      <button
        onClick={onOpen}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-gray-800 active:scale-[0.98]"
      >
        <Plus size={16} />
        Create Form
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
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl cursor-pointer">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-black via-gray-700 to-gray-400 opacity-80" />

      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyle[status]}`}
        >
          {status}
        </span>

        <span className="text-xs text-gray-400">{date}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-900 transition group-hover:text-black">
        {form.title}
      </h3>

      {form.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {form.description}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <FileText size={13} />
          {form.responseCount ?? 0} responses
        </span>

        <div className="flex gap-2">
          <Link
            href={`/dashboard/forms/${form.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 transition-all hover:border-black hover:text-black hover:shadow-sm"
            aria-label="Edit"
          >
            <Pencil size={14} />
          </Link>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 transition-all hover:border-black hover:text-black hover:shadow-sm"
            aria-label="Share"
          >
            <Share2 size={14} />
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

  const [visibility, setVisibility] = useState<
    "PUBLIC" | "UNLISTED" | "PRIVATE"
  >("UNLISTED");

  const [allowEmbed, setAllowEmbed] = useState(true);

  const [isPasswordProtected, setIsPasswordProtected] = useState(false);

  const [password, setPassword] = useState("");

  const [expiryDate, setExpiryDate] = useState("");

  const [responseLimit, setResponseLimit] = useState("");

  // List state
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "published" | "draft" | "archived"
  >("all");

  // Hooks
  const { createFormAsync, status: createStatus } = useCreateForm();

  const { forms, isLoading, isFetching, error } = useListForm();

  const isCreating = createStatus === "pending";

  const handleCreateForm = async () => {
    if (!title.trim()) return;

    try {
      await createFormAsync({
        title,

        description: description.trim() || undefined,

        visibility,

        isPasswordProtected,

        passwordHash: isPasswordProtected ? password : undefined,

        expiryDate: expiryDate ? new Date(expiryDate) : undefined,

        responseLimit: responseLimit
          ? Number(responseLimit)
          : undefined,
      });

      setTitle("");
      setDescription("");

      setVisibility("UNLISTED");

      setAllowEmbed(true);

      setIsPasswordProtected(false);

      setPassword("");

      setExpiryDate("");

      setResponseLimit("");

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = (forms as Form[] | undefined)?.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || f.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="min-h-screen flex flex-1 flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-6 py-4 md:py-6">
            {/* ── Header ── */}
            <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between lg:px-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Forms
                  {isFetching && !isLoading && (
                    <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-black align-middle" />
                  )}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage and share all your forms.
                </p>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-gray-800 active:scale-[0.98]"
              >
                <Plus size={16} />
                Create Form
              </button>
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-col gap-3 px-4 md:flex-row md:items-center lg:px-6">
              {/* Search */}
              <div className="relative w-full md:max-w-sm">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search forms..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 pl-10 pr-4 py-2.5 text-sm shadow-sm outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                />
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                {(
                  ["all", "published", "draft", "archived"] as const
                ).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-lg px-4 py-2 text-xs font-medium capitalize transition-all ${
                      filter === f
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Count */}
              {!isLoading && (
                <span className="text-xs text-gray-400 md:ml-auto">
                  {filtered?.length ?? 0} form
                  {filtered?.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* ── Error ── */}
            {error && (
              <div className="mx-4 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 lg:mx-6">
                <AlertCircle size={16} />
                Failed to load forms — {error.message}
              </div>
            )}

            {/* ── Grid ── */}
            <div className="px-4 lg:px-6">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : !error &&
                (!filtered || filtered.length === 0) ? (
                <EmptyState onOpen={() => setOpen(true)} />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Create New Form
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Fill the details below to create your form.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[75vh] space-y-5 overflow-y-auto p-6">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Form Title
                </label>

                <input
                  type="text"
                  placeholder="Enter form title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  placeholder="Enter form description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                />
              </div>

              {/* Visibility */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Visibility
                </label>

                <select
                  value={visibility}
                  onChange={(e) =>
                    setVisibility(
                      e.target.value as
                        | "PUBLIC"
                        | "UNLISTED"
                        | "PRIVATE"
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                >
                  <option value="PUBLIC">Public</option>

                  <option value="UNLISTED">Unlisted</option>

                  <option value="PRIVATE">Private</option>
                </select>
              </div>

              {/* Allow Embed */}
              <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/70 px-4 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Allow Embed
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Allow this form to be embedded on websites
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={allowEmbed}
                  onChange={(e) =>
                    setAllowEmbed(e.target.checked)
                  }
                  className="h-5 w-5 rounded border-gray-300"
                />
              </div>

              {/* Password Protection */}
              <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Password Protection
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Require password before users can access
                      this form
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={isPasswordProtected}
                    onChange={(e) =>
                      setIsPasswordProtected(
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>

                {isPasswordProtected && (
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  />
                )}
              </div>

              {/* Expiry Date */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>

                <input
                  type="datetime-local"
                  value={expiryDate}
                  onChange={(e) =>
                    setExpiryDate(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Leave empty if form should never expire.
                </p>
              </div>

              {/* Response Limit */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Response Limit
                </label>

                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={responseLimit}
                  onChange={(e) =>
                    setResponseLimit(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Leave empty for unlimited responses.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-5 sm:flex-row sm:justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-400 hover:text-red-500"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateForm}
                disabled={
                  isCreating ||
                  !title.trim() ||
                  (isPasswordProtected &&
                    !password.trim())
                }
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCreating
                  ? "Creating..."
                  : "Create Form"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}