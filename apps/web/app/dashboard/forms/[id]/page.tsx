"use client";

import { use, useState, useEffect } from "react";
import { Plus, Trash2, ChevronDown, Pencil, Check, X } from "lucide-react";

import {
  useCreateField,
  useDeleteField,
  useGetFields,
  useGetForm,
  useUpdateField,
} from "~/hooks/api/form";

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

const FIELD_TYPES: {
  value: FieldType;
  label: string;
}[] = [
    { value: "TEXT", label: "Text" },
    { value: "NUMBER", label: "Number" },
    { value: "EMAIL", label: "Email" },
    { value: "YES_NO", label: "Yes / No" },
    { value: "PASSWORD", label: "Password" },
  ];

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

// ── Preview field renderer ─────────────────────────────────────────────────────
function PreviewField({
  field,
  isEditing,
  editDraft,
  onEditDraftChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
}: {
  field: FormField;

  isEditing: boolean;

  editDraft: Omit<FormField, "id" | "orderIndex">;

  onEditDraftChange: (patch: Partial<Omit<FormField, "id" | "orderIndex">>) => void;

  onStartEdit: () => void;

  onSaveEdit: () => void;

  onCancelEdit: () => void;

  onRemove: () => void;
}) {
  return (
    <div className="group relative border-b border-gray-100 pb-6 last:border-b-0">
      {/* actions */}
      <div className="absolute right-0 top-0 flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
        {isEditing ? (
          <>
            <button
              onClick={onSaveEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 transition hover:bg-green-100"
            >
              <Check size={14} />
            </button>

            <button
              onClick={onCancelEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onStartEdit}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Pencil size={14} />
            </button>

            <button
              onClick={onRemove}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-4 pr-16">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Label</label>

            <input
              type="text"
              value={editDraft.label}
              onChange={(e) =>
                onEditDraftChange({
                  label: e.target.value,
                  labelKey: toLabelKey(e.target.value),
                })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>

            <div className="relative">
              <select
                value={editDraft.type}
                onChange={(e) =>
                  onEditDraftChange({
                    type: e.target.value as FieldType,
                  })
                }
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {editDraft.type !== "YES_NO" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Placeholder</label>

              <input
                type="text"
                value={editDraft.placeholder}
                onChange={(e) =>
                  onEditDraftChange({
                    placeholder: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>

            <input
              type="text"
              value={editDraft.description}
              onChange={(e) =>
                onEditDraftChange({
                  description: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={editDraft.isRequired}
              onChange={(e) =>
                onEditDraftChange({
                  isRequired: e.target.checked,
                })
              }
              className="h-4 w-4 rounded accent-indigo-600"
            />
            Required field
          </label>
        </div>
      ) : (
        <div className="pr-16">
          {/* label */}
          <div className="mb-2 flex items-center gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              {field.label || "Untitled field"}
            </label>

            {field.isRequired && <span className="text-red-500">*</span>}
          </div>

          {/* description */}
          {field.description && <p className="mb-3 text-sm text-gray-500">{field.description}</p>}

          {/* field */}
          {field.type === "YES_NO" ? (
            <div className="flex gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="radio" disabled />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="radio" disabled />
                No
              </label>
            </div>
          ) : (
            <input
              disabled
              type={
                field.type === "PASSWORD"
                  ? "password"
                  : field.type === "NUMBER"
                    ? "number"
                    : field.type === "EMAIL"
                      ? "email"
                      : "text"
              }
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase() || "value"}`}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function FormBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { form, isLoading: isLoadingForm } = useGetForm(id);

  const [fields, setFields] = useState<FormField[]>([]);

  const [draft, setDraft] = useState<Omit<FormField, "id" | "orderIndex">>(emptyDraft());

  const [draftError, setDraftError] = useState("");

  const [showMobileBuilder, setShowMobileBuilder] = useState(false);

  const setDraftField = (patch: Partial<typeof draft>) => setDraft((d) => ({ ...d, ...patch }));

  const { updateFieldAsync } = useUpdateField(id);

  const [editingId, setEditingId] = useState<string | undefined>(undefined);

  const [editDraft, setEditDraft] = useState<Omit<FormField, "id" | "orderIndex">>(emptyDraft());

  const { createFieldAsync, status: createStatus } = useCreateField(id);

  const { deleteFieldAsync } = useDeleteField(id);

  const isCreating = createStatus === "pending";

  const { fields: existingFields, isLoading: isLoadingFields } = useGetFields(id);

  useEffect(() => {
    if (existingFields && existingFields.length > 0) {
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

  const handleAddField = async () => {
    if (!draft.label.trim()) {
      setDraftError("Label is required.");
      return;
    }

    setDraftError("");

    try {
      const saved = await createFieldAsync({
        formId: id,
        label: draft.label,
        type: draft.type,
        description: draft.description || undefined,
        placeholder: draft.placeholder || undefined,
        isRequired: draft.isRequired,
      });

      setFields((prev) => [
        ...prev,
        {
          id: saved.id,
          label: draft.label,
          labelKey: saved.labelKey,
          description: draft.description,
          placeholder: draft.placeholder,
          isRequired: draft.isRequired,
          orderIndex: Number(saved.orderIndex),
          type: draft.type,
        },
      ]);

      setDraft(emptyDraft());
    } catch (e) {
      setDraftError("Failed to add field. Try again.");
    }
  };

  const removeField = async (fieldId: string) => {
    try {
      await deleteFieldAsync({ fieldId });

      setFields((prev) =>
        prev
          .filter((f) => f.id !== fieldId)
          .map((f, i) => ({
            ...f,
            orderIndex: i + 1,
          })),
      );
    } catch (e) {
      console.error("Failed to delete field");
    }
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

  const handleEditSave = async (fieldId: string) => {
    try {
      await updateFieldAsync({
        fieldId,
        label: editDraft.label,
        type: editDraft.type,
        description: editDraft.description || "",
        placeholder: editDraft.placeholder || "",
        isRequired: editDraft.isRequired,
      });

      setFields((prev) => prev.map((f) => (f.id === fieldId ? { ...f, ...editDraft } : f)));

      cancelEditing();
    } catch (e) {
      console.error("Failed to update field");
    }
  };

  return (
    <div className="flex flex-col bg-linear-to-br from-slate-50 via-white to-indigo-50 md:h-[91vh]">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 flex flex-col gap-4 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl font-bold text-gray-900">Form Builder</h2>
          <p className="mt-1 text-sm text-gray-500">
            {fields.length} field
            {fields.length !== 1 ? "s" : ""} added
          </p>
        </div>
      </div>

      {isLoadingFields ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm text-gray-500 shadow-sm">
            Loading fields...
          </div>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          {/* ───────────────── LEFT PANEL ───────────────── */}
          <div
            className={`
        fixed inset-y-0 left-0 z-40 w-full overflow-y-auto border-r border-gray-200 bg-white
        transition-transform duration-300 lg:static lg:z-auto lg:block lg:w-[420px] lg:translate-x-0 
        ${showMobileBuilder ? "translate-x-0" : "-translate-x-full"}
      `}
          >
            {/* mobile top spacing */}
            <div className="h-[73px] lg:hidden" />

            <div className="custom-scrollbar flex h-full flex-col gap-5 overflow-y-auto p-5 lg:overflow-hidden">
              {/* mobile close */}
              <div className="flex items-center justify-between lg:hidden">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    Field Builder
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-gray-900">Add New Field</h3>
                </div>

                <button
                  onClick={() => setShowMobileBuilder(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500"
                >
                  <X size={18} />
                </button>
              </div>

              {/* desktop heading */}
              {/* <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  New Field
                </p>

              </div>  */}

              {/* Label */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Label</label>

                <input
                  type="text"
                  placeholder="Label"
                  value={draft.label}
                  onChange={(e) =>
                    setDraftField({
                      label: e.target.value,
                      labelKey: toLabelKey(e.target.value),
                    })
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />

                {draftError && <p className="text-xs text-red-500">{draftError}</p>}
              </div>

              {/* Type */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Type</label>

                <div className="relative">
                  <select
                    value={draft.type}
                    onChange={(e) =>
                      setDraftField({
                        type: e.target.value as FieldType,
                      })
                    }
                    className="w-full appearance-none rounded-xl border  border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-black outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  >
                    {/* <option value="" disabled>
                      Select field type
                    </option> */}

                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>

              {/* Placeholder */}
              {draft.type !== "YES_NO" && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Placeholder</label>

                  <input
                    type="text"
                    placeholder="Enter placeholder text"
                    value={draft.placeholder}
                    onChange={(e) =>
                      setDraftField({
                        placeholder: e.target.value,
                      })
                    }
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Description</label>

                <input
                  type="text"
                  placeholder="Short helper text"
                  value={draft.description}
                  onChange={(e) =>
                    setDraftField({
                      description: e.target.value,
                    })
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Key */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Key</label>

                <input
                  type="text"
                  value={draft.labelKey}
                  onChange={(e) =>
                    setDraftField({
                      labelKey: e.target.value,
                    })
                  }
                  className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 font-mono text-xs text-gray-500 outline-none"
                />
              </div>

              {/* Required */}
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={draft.isRequired}
                  onChange={(e) =>
                    setDraftField({
                      isRequired: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded accent-indigo-600"
                />

                <span className="text-sm text-gray-700">Mark as required</span>
              </label>

              {/* Add Button */}
              <button
                onClick={handleAddField}
                disabled={isCreating}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-medium text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />

                {isCreating ? "Adding..." : "Add Field"}
              </button>
            </div>
          </div>

          {/* ───────────────── RIGHT PANEL ───────────────── */}
          <div className="custom-scrollbar flex-1 overflow-y-auto lg:h-[calc(100vh-73px)]">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
              {/* mobile top button */}
              <button
                onClick={() => setShowMobileBuilder(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 px-5 py-4 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 lg:hidden"
              >
                <Plus size={16} />
                Add New Field
              </button>

              <div className="md:flex items-center gap-6">
                <h3 className="text-2xl font-bold text-gray-900 ">
                  {isLoadingForm ? "Loading..." : form?.title || "Untitled Form"}  <span className="text-indigo-500 ml-4">[Preview]</span>
                </h3>
                {/* <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Preview
                </p> */}

              </div>

              {fields.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/70 p-10 text-center shadow-sm">
                  <div className="rounded-3xl bg-indigo-50 p-6">
                    <Plus size={40} className="text-indigo-300" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-800">No fields added</h3>

                  <p className="mt-2 max-w-sm text-sm text-gray-500">
                    Create your first field using the builder panel.
                  </p>

                  {/* mobile empty state button */}
                  <button
                    onClick={() => setShowMobileBuilder(true)}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm lg:hidden"
                  >
                    <Plus size={16} />
                    Add Field
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white/70 p-5 shadow-sm backdrop-blur">
                    {fields.map((field) => (
                      <PreviewField
                        key={field.id}
                        field={field}
                        isEditing={editingId === field.id}
                        editDraft={editDraft}
                        onEditDraftChange={(patch) =>
                          setEditDraft((d) => ({
                            ...d,
                            ...patch,
                          }))
                        }
                        onStartEdit={() => startEditing(field)}
                        onSaveEdit={() => handleEditSave(field.id)}
                        onCancelEdit={cancelEditing}
                        onRemove={() => removeField(field.id)}
                      />
                    ))}
                  </div>

                  {/* bottom mobile add button */}
                  <button
                    onClick={() => setShowMobileBuilder(true)}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-indigo-300 bg-white px-5 py-4 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 lg:hidden"
                  >
                    <Plus size={16} />
                    Add Another Field
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
