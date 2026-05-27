"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";

import {
  Plus,
  Trash2,
  ChevronDown,
  Pencil,
  Check,
  X,
  Eye,
  Settings,
  Globe,
  Loader2,
} from "lucide-react";

import {
  useCreateField,
  useDeleteField,
  useGetFields,
  useGetForm,
  useUpdateField,
  useUpdateForm,
} from "~/hooks/api/form";

type FieldType =
  | "TEXT"
  | "NUMBER"
  | "EMAIL"
  | "YES_NO"
  | "PASSWORD";

type FormField = {
  id: string;
  label: string;
  labelKey: string;
  description: string;
  placeholder: string;
  isRequired: boolean;
  orderIndex: number;
  type: FieldType;
};

const FIELD_TYPES = [
  { value: "TEXT", label: "Text" },
  { value: "NUMBER", label: "Number" },
  { value: "EMAIL", label: "Email" },
  { value: "YES_NO", label: "Yes / No" },
  { value: "PASSWORD", label: "Password" },
] as const;

function toLabelKey(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function emptyDraft(): Omit<
  FormField,
  "id" | "orderIndex"
> {
  return {
    label: "",
    labelKey: "",
    description: "",
    placeholder: "",
    isRequired: false,
    type: "TEXT",
  };
}

export default function FormBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    forms,
    isLoading: isLoadingForm,
  } = useGetForm(id);

  const {
    fields: existingFields,
    isLoading: isLoadingFields,
  } = useGetFields(id);

  const {
    createFieldAsync,
    status: createStatus,
  } = useCreateField(id);

  const {
    updateFieldAsync,
  } = useUpdateField(id);

  const {
    deleteFieldAsync,
  } = useDeleteField(id);

  const {
    updateFormAsync,
    status: updateFormStatus,
  } = useUpdateForm();

  const [fields, setFields] = useState<
    FormField[]
  >([]);

  const [draft, setDraft] = useState<
    Omit<FormField, "id" | "orderIndex">
  >(emptyDraft());

  const [draftError, setDraftError] =
    useState("");

  const [editingId, setEditingId] =
    useState<string>();

  const [showMobileBuilder, setShowMobileBuilder] =
    useState(false);

  const [editDraft, setEditDraft] =
    useState<
      Omit<FormField, "id" | "orderIndex">
    >(emptyDraft());

  useEffect(() => {
    if (existingFields) {
      setFields(
        existingFields.map((f) => ({
          id: f.fieldId,
          label: f.label,
          labelKey: toLabelKey(f.label),
          description:
            f.description ?? "",
          placeholder:
            f.placeholder ?? "",
          isRequired:
            f.isRequired,
          orderIndex:
            Number(f.orderIndex),
          type:
            f.type as FieldType,
        })),
      );
    }
  }, [existingFields]);

  const isCreating =
    createStatus === "pending";

  const isPublishing =
    updateFormStatus === "pending";

  const isPublished =
    forms?.status === "PUBLISHED";

  const publicUrl = useMemo(() => {
    if (!forms?.slug) return "#";

    return `/form/public/${forms.slug}`;
  }, [forms]);

  const setDraftField = (
    patch: Partial<typeof draft>,
  ) => {
    setDraft((d) => ({
      ...d,
      ...patch,
    }));
  };

  const handlePublishToggle =
    async () => {
      if (!forms) return;

      try {
        await updateFormAsync({
          formId: forms.formId,

          title: forms.title,

          description:
            forms.description ?? null,

          visibility:
            forms.visibility,

          isPasswordProtected:
            forms.isPasswordProtected,

          publishedAt:
            isPublished
              ? null
              : new Date(),

          expiryDate:
            forms.expiryDate ?? null,

          responseLimit:
            forms.responseLimit ?? null,

          theme:
            forms.theme,

          status:
            isPublished
              ? "DRAFT"
              : "PUBLISHED",
        });
      } catch (err) {
        console.error(err);
      }
    };

  const handleAddField =
    async () => {
      if (!draft.label.trim()) {
        setDraftError(
          "Label is required",
        );

        return;
      }

      setDraftError("");

      try {
        const saved =
          await createFieldAsync({
            formId: id,

            label: draft.label,

            type: draft.type,

            description:
              draft.description ||
              undefined,

            placeholder:
              draft.placeholder ||
              undefined,

            isRequired:
              draft.isRequired,
          });

        setFields((prev) => [
          ...prev,

          {
            id: saved.id,

            label: draft.label,

            labelKey:
              saved.labelKey,

            description:
              draft.description,

            placeholder:
              draft.placeholder,

            isRequired:
              draft.isRequired,

            orderIndex:
              Number(
                saved.orderIndex,
              ),

            type: draft.type,
          },
        ]);

        setDraft(emptyDraft());
      } catch {
        setDraftError(
          "Failed to create field",
        );
      }
    };

  const removeField =
    async (fieldId: string) => {
      await deleteFieldAsync({
        fieldId,
      });

      setFields((prev) =>
        prev.filter(
          (f) =>
            f.id !== fieldId,
        ),
      );
    };

  const startEditing = (
    field: FormField,
  ) => {
    setEditingId(field.id);

    setEditDraft({
      label: field.label,

      labelKey:
        field.labelKey,

      description:
        field.description,

      placeholder:
        field.placeholder,

      isRequired:
        field.isRequired,

      type: field.type,
    });
  };

  const cancelEditing = () => {
    setEditingId(undefined);

    setEditDraft(emptyDraft());
  };

  const handleEditSave =
    async (fieldId: string) => {
      await updateFieldAsync({
        fieldId,

        label: editDraft.label,

        type: editDraft.type,

        description:
          editDraft.description,

        placeholder:
          editDraft.placeholder,

        isRequired:
          editDraft.isRequired,
      });

      setFields((prev) =>
        prev.map((f) =>
          f.id === fieldId
            ? {
                ...f,
                ...editDraft,
              }
            : f,
        ),
      );

      cancelEditing();
    };

  if (isLoadingForm) {
    return (
      <div className="flex h-[90vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-linear-to-br from-zinc-50 via-white to-zinc-100 md:h-[91vh]">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="flex flex-col gap-5 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                {forms?.title}
              </h1>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${
                    isPublished
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }
                `}
              >
                {forms?.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-zinc-500">
              {fields.length} field
              {fields.length !== 1
                ? "s"
                : ""}{" "}
              added
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={publicUrl}
              target="_blank"
              className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <Eye size={16} />
              Preview
            </Link>

            <Link
              href={`/dashboard/forms/${id}/settings`}
              className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              <Settings size={16} />
              Settings
            </Link>

            <button
              onClick={
                handlePublishToggle
              }
              disabled={
                isPublishing
              }
              className={`
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                ${
                  isPublished
                    ? "bg-zinc-900 hover:bg-zinc-800"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }
              `}
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Globe size={16} />
              )}

              {isPublished
                ? "Unpublish"
                : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Builder Panel */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-full overflow-y-auto border-r border-zinc-200 bg-white transition-transform duration-300 lg:static lg:w-[400px] lg:translate-x-0
            ${
              showMobileBuilder
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <div className="h-[80px] lg:hidden" />

          <div className="flex flex-col gap-5 p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
                Field Builder
              </p>

              <h3 className="mt-2 text-xl font-semibold text-zinc-900">
                Add New Field
              </h3>
            </div>

            {/* Label */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700">
                Label
              </label>

              <input
                type="text"
                value={draft.label}
                onChange={(e) =>
                  setDraftField({
                    label:
                      e.target.value,

                    labelKey:
                      toLabelKey(
                        e.target
                          .value,
                      ),
                  })
                }
                className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />

              {draftError && (
                <p className="text-xs text-red-500">
                  {draftError}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700">
                Type
              </label>

              <div className="relative">
                <select
                  value={draft.type}
                  onChange={(e) =>
                    setDraftField({
                      type:
                        e.target
                          .value as FieldType,
                    })
                  }
                  className="w-full appearance-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  {FIELD_TYPES.map(
                    (t) => (
                      <option
                        key={
                          t.value
                        }
                        value={
                          t.value
                        }
                      >
                        {t.label}
                      </option>
                    ),
                  )}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
            </div>

            {/* Placeholder */}
            {draft.type !==
              "YES_NO" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-700">
                  Placeholder
                </label>

                <input
                  type="text"
                  value={
                    draft.placeholder
                  }
                  onChange={(e) =>
                    setDraftField({
                      placeholder:
                        e.target
                          .value,
                    })
                  }
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700">
                Description
              </label>

              <input
                type="text"
                value={
                  draft.description
                }
                onChange={(e) =>
                  setDraftField({
                    description:
                      e.target
                        .value,
                  })
                }
                className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Required */}
            <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <input
                type="checkbox"
                checked={
                  draft.isRequired
                }
                onChange={(e) =>
                  setDraftField({
                    isRequired:
                      e.target
                        .checked,
                  })
                }
                className="h-4 w-4 rounded accent-indigo-600"
              />

              <span className="text-sm text-zinc-700">
                Required field
              </span>
            </label>

            {/* Add Button */}
            <button
              onClick={
                handleAddField
              }
              disabled={
                isCreating
              }
              className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.01]"
            >
              <Plus size={16} />

              {isCreating
                ? "Adding..."
                : "Add Field"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
            <button
              onClick={() =>
                setShowMobileBuilder(
                  true,
                )
              }
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 px-5 py-4 text-sm font-medium text-indigo-700 lg:hidden"
            >
              <Plus size={16} />
              Add Field
            </button>

            <div className="rounded-[32px] border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl">
              {fields.length ===
              0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <Plus className="h-10 w-10 text-zinc-300" />

                  <h3 className="mt-4 text-lg font-semibold text-zinc-800">
                    No fields yet
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    Start building
                    your form using
                    the field builder.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {fields.map(
                    (field) => (
                      <div
                        key={
                          field.id
                        }
                        className="group relative border-b border-zinc-100 pb-6 last:border-b-0"
                      >
                        {/* Actions */}
                        <div className="absolute right-0 top-0 flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                          {editingId ===
                          field.id ? (
                            <>
                              <button
                                onClick={() =>
                                  handleEditSave(
                                    field.id,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
                              >
                                <Check size={14} />
                              </button>

                              <button
                                onClick={
                                  cancelEditing
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500"
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  startEditing(
                                    field,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500"
                              >
                                <Pencil size={14} />
                              </button>

                              <button
                                onClick={() =>
                                  removeField(
                                    field.id,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Preview */}
                        <div className="pr-16">
                          <div className="mb-2 flex items-center gap-1">
                            <label className="text-sm font-medium text-zinc-800">
                              {
                                field.label
                              }
                            </label>

                            {field.isRequired && (
                              <span className="text-red-500">
                                *
                              </span>
                            )}
                          </div>

                          {field.description && (
                            <p className="mb-3 text-sm text-zinc-500">
                              {
                                field.description
                              }
                            </p>
                          )}

                          {field.type ===
                          "YES_NO" ? (
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 text-sm text-zinc-700">
                                <input
                                  type="radio"
                                  disabled
                                />
                                Yes
                              </label>

                              <label className="flex items-center gap-2 text-sm text-zinc-700">
                                <input
                                  type="radio"
                                  disabled
                                />
                                No
                              </label>
                            </div>
                          ) : (
                            <input
                              disabled
                              type="text"
                              placeholder={
                                field.placeholder
                              }
                              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500"
                            />
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}