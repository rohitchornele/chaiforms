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
  ArrowLeft,
} from "lucide-react";

import {
  useCreateField,
  useDeleteField,
  useGetFields,
  useGetForm,
  useUpdateField,
  useUpdateForm,
} from "~/hooks/api/form";

import { FORM_THEMES, type FormTheme } from "~/lib/form-themes";

type FieldType = "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD";

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
  {
    value: "TEXT",
    label: "Text",
  },

  {
    value: "NUMBER",
    label: "Number",
  },

  {
    value: "EMAIL",
    label: "Email",
  },

  {
    value: "YES_NO",
    label: "Yes / No",
  },

  {
    value: "PASSWORD",
    label: "Password",
  },
] as const;

function toLabelKey(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function emptyDraft(): Omit<FormField, "id" | "orderIndex"> {
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
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);

  const { forms, isLoading: isLoadingForm } = useGetForm(id);

  const { fields: existingFields, isLoading: isLoadingFields } = useGetFields(id);

  const { createFieldAsync } = useCreateField(id);

  const { updateFieldAsync } = useUpdateField(id);

  const { deleteFieldAsync } = useDeleteField(id);

  const { updateFormAsync, status: updateFormStatus } = useUpdateForm();

  const [fields, setFields] = useState<FormField[]>([]);

  const [draft, setDraft] = useState<Omit<FormField, "id" | "orderIndex">>(emptyDraft());

  const [draftError, setDraftError] = useState("");

  const [editingId, setEditingId] = useState<string>();

  const [showMobileBuilder, setShowMobileBuilder] = useState(false);

  const [editDraft, setEditDraft] = useState<Omit<FormField, "id" | "orderIndex">>(emptyDraft());

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [isSavingChanges, setIsSavingChanges] = useState(false);

  useEffect(() => {
    if (existingFields) {
      setFields(
        existingFields.map((f) => ({
          id: f.fieldId,

          label: f.label,

          labelKey: toLabelKey(f.label),

          description: f.description ?? "",

          placeholder: f.placeholder ?? "",

          isRequired: f.isRequired,

          orderIndex: Number(f.orderIndex),

          type: f.type as FieldType,
        })),
      );
    }
  }, [existingFields]);

  const isPublishing = updateFormStatus === "pending";

  const isPublished = forms?.status === "PUBLISHED";

  const theme = FORM_THEMES[(forms?.theme ?? "sacred-tech") as FormTheme];

  const publicUrl = useMemo(() => {
    if (!forms?.slug) return "#";

    return `/form/public/${forms.slug}`;
  }, [forms]);

  const setDraftField = (patch: Partial<typeof draft>) => {
    setDraft((d) => ({
      ...d,

      ...patch,
    }));
  };

  const handlePublishToggle = async () => {
    if (!forms) return;

    try {
      await updateFormAsync({
        formId: forms.formId,

        title: forms.title,

        description: forms.description ?? null,

        visibility: forms.visibility,

        isPasswordProtected: forms.isPasswordProtected,

        publishedAt: isPublished ? null : new Date(),

        expiryDate: forms.expiryDate ?? null,

        responseLimit: forms.responseLimit ?? null,

        theme: forms.theme,

        status: isPublished ? "DRAFT" : "PUBLISHED",
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * ADD FIELD
   * LOCAL ONLY
   */

  const handleAddField = () => {
    if (!draft.label.trim()) {
      setDraftError("Label is required");

      return;
    }

    setDraftError("");

    setFields((prev) => [
      ...prev,

      {
        id: crypto.randomUUID(),

        label: draft.label,

        labelKey: toLabelKey(draft.label),

        description: draft.description,

        placeholder: draft.placeholder,

        isRequired: draft.isRequired,

        orderIndex: prev.length + 1,

        type: draft.type,
      },
    ]);

    setHasUnsavedChanges(true);

    setDraft(emptyDraft());
  };

  /**
   * REMOVE FIELD
   * LOCAL ONLY
   */

  const removeField = (fieldId: string) => {
    setFields((prev) => prev.filter((f) => f.id !== fieldId));

    setHasUnsavedChanges(true);
  };

  const startEditing = (field: FormField) => {
    setEditingId(field.id);

    setEditDraft({
      label: field.label,

      labelKey: field.labelKey,

      description: field.description,

      placeholder: field.placeholder,

      isRequired: field.isRequired,

      type: field.type,
    });
  };

  const cancelEditing = () => {
    setEditingId(undefined);

    setEditDraft(emptyDraft());
  };

  /**
   * EDIT SAVE
   * LOCAL ONLY
   */

  const handleEditSave = (fieldId: string) => {
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

    setHasUnsavedChanges(true);

    cancelEditing();
  };

  /**
   * SAVE CHANGES
   * DB SYNC
   */

  const handleSaveChanges = async () => {
    try {
      setIsSavingChanges(true);

      const existingIds = existingFields?.map((f) => f.fieldId) || [];

      const currentIds = fields.map((f) => f.id);

      /**
       * DELETE REMOVED
       */

      const removedIds = existingIds.filter((id) => !currentIds.includes(id));

      for (const fieldId of removedIds) {
        await deleteFieldAsync({
          fieldId,
        });
      }

      /**
       * CREATE / UPDATE
       */

      for (const field of fields) {
        const existsInDb = existingIds.includes(field.id);

        if (existsInDb) {
          await updateFieldAsync({
            fieldId: field.id,

            label: field.label,

            type: field.type,

            description: field.description,

            placeholder: field.placeholder,

            isRequired: field.isRequired,
          });
        } else {
          await createFieldAsync({
            formId: id,

            label: field.label,

            type: field.type,

            description: field.description,

            placeholder: field.placeholder,

            isRequired: field.isRequired,
          });
        }
      }

      setHasUnsavedChanges(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingChanges(false);
    }
  };

  if (isLoadingForm || isLoadingFields) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,115,43,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(31,74,59,0.15),transparent_30%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* TOPBAR */}
      <div className="relative z-30 border-b border-white/10 bg-black/30 backdrop-blur-3xl">
        <div className="flex flex-col gap-5 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          {/* LEFT */}
          <div>
            <Link
              href="/dashboard/forms"
              className="
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-sm
                font-medium
                text-white/70
                transition-all
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <ArrowLeft size={16} />
              Back to Forms
            </Link>

            <div className="mt-4 flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white">{forms?.title}</h1>

              <span
                className={`
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  ${
                    isPublished
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/20 bg-amber-500/10 text-amber-300"
                  }
                `}
              >
                {forms?.status}
              </span>

              {hasUnsavedChanges && (
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
                  Unsaved Changes
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-white/40">
              {fields.length} field
              {fields.length !== 1 ? "s" : ""} added
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-3">
            {/* SAVE */}
            <button
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges || isSavingChanges}
              className={`
                flex
                items-center
                gap-2
                rounded-2xl
                px-5
                py-2.5
                text-sm
                font-medium
                transition-all

                ${
                  hasUnsavedChanges
                    ? `
                      bg-white
                      text-black
                      hover:opacity-90
                    `
                    : `
                      bg-white/5
                      text-white/30
                      cursor-not-allowed
                    `
                }
              `}
            >
              {isSavingChanges ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check size={16} />}
              Save Changes
            </button>

            {/* PREVIEW */}
            <Link
              href={publicUrl}
              target="_blank"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
            >
              <Eye size={16} />
              Preview
            </Link>

            {/* SETTINGS */}
            <Link
              href={`/dashboard/forms/${id}/settings`}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
            >
              <Settings size={16} />
              Settings
            </Link>

            {/* PUBLISH */}
            <button
              onClick={handlePublishToggle}
              disabled={isPublishing}
              className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-[#C9732B] to-[#B56A3C] px-5 py-2.5 text-sm font-medium text-white shadow-lg transition hover:scale-[1.01]"
            >
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe size={16} />}

              {isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Builder Panel */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 w-full overflow-y-auto border-r border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl transition-transform duration-300 lg:static lg:w-[400px] lg:translate-x-0
            ${showMobileBuilder ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="h-[80px] lg:hidden" />

          <div className="flex flex-col gap-5 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9732B]">
                Field Builder
              </p>

              <h3 className="mt-3 text-2xl font-bold text-white">Add New Field</h3>
            </div>

            {/* Label */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/80">Label</label>

              <input
                type="text"
                value={draft.label}
                onChange={(e) =>
                  setDraftField({
                    label: e.target.value,

                    labelKey: toLabelKey(e.target.value),
                  })
                }
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
              />

              {draftError && <p className="text-xs text-red-400">{draftError}</p>}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/80">Type</label>

              <div className="relative">
                <select
                  value={draft.type}
                  onChange={(e) =>
                    setDraftField({
                      type: e.target.value as FieldType,
                    })
                  }
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t.value} value={t.value} className="bg-black">
                      {t.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              </div>
            </div>

            {/* Placeholder */}
            {draft.type !== "YES_NO" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/80">Placeholder</label>

                <input
                  type="text"
                  value={draft.placeholder}
                  onChange={(e) =>
                    setDraftField({
                      placeholder: e.target.value,
                    })
                  }
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
                />
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/80">Description</label>

              <textarea
                rows={4}
                value={draft.description}
                onChange={(e) =>
                  setDraftField({
                    description: e.target.value,
                  })
                }
                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
              />
            </div>

            {/* Required */}
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
              <input
                type="checkbox"
                checked={draft.isRequired}
                onChange={(e) =>
                  setDraftField({
                    isRequired: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded accent-[#C9732B]"
              />

              <span className="text-sm text-white/80">Required field</span>
            </label>

            {/* Add Button */}
            <button
              onClick={handleAddField}
              // disabled={isCreating}
              className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#C9732B] to-[#B56A3C] px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.01]"
            >
              <Plus size={16} />

              {/* {isCreating ? "Adding..." : "Add Field"} */}
              "Add Field"
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-5 py-8">
            <button
              onClick={() => setShowMobileBuilder(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#C9732B]/30 bg-[#C9732B]/10 px-5 py-4 text-sm font-medium text-[#F3EBDD] lg:hidden"
            >
              <Plus size={16} />
              Add Field
            </button>

            <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
              {/* Form Header */}
              <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-[#F3EBDD]">{forms?.title}</h1>

                {forms?.description && (
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
                    {forms.description}
                  </p>
                )}
              </div>

              {fields.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[40px] border border-dashed border-white/10 bg-white/[0.02] text-center">
                  <div className="rounded-full bg-white/5 p-5">
                    <Plus className="h-10 w-10 text-white/40" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">Start Building</h3>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                    Add fields from the builder panel to create your immersive form experience.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      {/* Actions */}
                      <div className="absolute right-5 top-5 flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                        {editingId === field.id ? (
                          <>
                            <button
                              onClick={() => handleEditSave(field.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300"
                            >
                              <Check size={14} />
                            </button>

                            <button
                              onClick={cancelEditing}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(field)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              onClick={() => removeField(field.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Edit Mode */}
                      {editingId === field.id ? (
                        <div className="flex flex-col gap-5 pr-20">
                          {/* Label */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-white/70">Label</label>

                            <input
                              type="text"
                              value={editDraft.label}
                              onChange={(e) =>
                                setEditDraft((prev) => ({
                                  ...prev,
                                  label: e.target.value,
                                }))
                              }
                              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
                            />
                          </div>

                          {/* Type */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-white/70">Field Type</label>

                            <div className="relative">
                              <select
                                value={editDraft.type}
                                onChange={(e) =>
                                  setEditDraft((prev) => ({
                                    ...prev,
                                    type: e.target.value as FieldType,
                                  }))
                                }
                                className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
                              >
                                {FIELD_TYPES.map((t) => (
                                  <option key={t.value} value={t.value} className="bg-black">
                                    {t.label}
                                  </option>
                                ))}
                              </select>

                              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                            </div>
                          </div>

                          {/* Placeholder */}
                          {editDraft.type !== "YES_NO" && (
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-white/70">
                                Placeholder
                              </label>

                              <input
                                type="text"
                                value={editDraft.placeholder}
                                onChange={(e) =>
                                  setEditDraft((prev) => ({
                                    ...prev,
                                    placeholder: e.target.value,
                                  }))
                                }
                                className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
                              />
                            </div>
                          )}

                          {/* Description */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-white/70">Description</label>

                            <textarea
                              rows={4}
                              value={editDraft.description}
                              onChange={(e) =>
                                setEditDraft((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#C9732B]/40 focus:ring-4 focus:ring-[#C9732B]/10"
                            />
                          </div>

                          {/* Required */}
                          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                            <input
                              type="checkbox"
                              checked={editDraft.isRequired}
                              onChange={(e) =>
                                setEditDraft((prev) => ({
                                  ...prev,
                                  isRequired: e.target.checked,
                                }))
                              }
                              className="h-4 w-4 rounded accent-[#C9732B]"
                            />

                            <span className="text-sm text-white/80">Required field</span>
                          </label>
                        </div>
                      ) : (
                        <div className="pr-20">
                          <div className="mb-3 flex items-center gap-2">
                            <label className="text-base font-semibold text-[#F3EBDD]">
                              {field.label}
                            </label>

                            {field.isRequired && <span className="text-red-400">*</span>}
                          </div>

                          {field.description && (
                            <p className="mb-5 text-sm leading-relaxed text-white/50">
                              {field.description}
                            </p>
                          )}

                          {field.type === "YES_NO" ? (
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 text-sm text-white/70">
                                <input type="radio" disabled />
                                Yes
                              </label>

                              <label className="flex items-center gap-2 text-sm text-white/70">
                                <input type="radio" disabled />
                                No
                              </label>
                            </div>
                          ) : (
                            <input
                              disabled
                              type="text"
                              placeholder={field.placeholder}
                              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
