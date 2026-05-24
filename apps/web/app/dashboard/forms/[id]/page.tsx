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

const FIELD_TYPES: { value: FieldType; label: string }[] = [
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
  field, isEditing, editDraft, onEditDraftChange,
  onStartEdit, onSaveEdit, onCancelEdit, onRemove,
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
    <div className="group relative rounded-xl border border-gray-100 p-4 transition hover:border-gray-200">
      {/* action buttons */}
      <div className="absolute right-3 top-3 hidden group-hover:flex items-center gap-1.5">
        {isEditing ? (
          <>
            <button onClick={onSaveEdit}
              className="h-6 w-6 flex items-center justify-center rounded-full border border-green-300 text-green-500 hover:bg-green-50"
              aria-label="Save">
              <Check size={11} />
            </button>
            <button onClick={onCancelEdit}
              className="h-6 w-6 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gray-300"
              aria-label="Cancel">
              <X size={11} />
            </button>
          </>
        ) : (
          <>
            <button onClick={onStartEdit}
              className="h-6 w-6 cursor-pointer flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600"
              aria-label="Edit">
              <Pencil size={11} />
            </button>
            <button onClick={onRemove}
              className="h-6 w-6 cursor-pointer flex items-center justify-center rounded-full border border-red-200 text-red-400 hover:border-red-400"
              aria-label="Remove">
              <Trash2 size={11} />
            </button>
          </>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3 pr-16">
          <input type="text" value={editDraft.label}
            onChange={(e) => onEditDraftChange({ label: e.target.value, labelKey: toLabelKey(e.target.value) })}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-gray-400" />
          <div className="relative">
            <select value={editDraft.type}
              onChange={(e) => onEditDraftChange({ type: e.target.value as FieldType })}
              className="w-full appearance-none rounded-lg border border-gray-200 pl-3 pr-8 py-1.5 text-sm outline-none focus:border-gray-400">
              {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {editDraft.type !== "YES_NO" && (
            <input type="text" placeholder="Placeholder" value={editDraft.placeholder}
              onChange={(e) => onEditDraftChange({ placeholder: e.target.value })}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-gray-400" />
          )}
          <input type="text" placeholder="Description" value={editDraft.description}
            onChange={(e) => onEditDraftChange({ description: e.target.value })}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-gray-400" />
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={editDraft.isRequired}
              onChange={(e) => onEditDraftChange({ isRequired: e.target.checked })}
              className="rounded accent-black" />
            Required
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 pr-16">
          <div className="flex items-center gap-1.5">
            <label className="text-sm font-medium text-gray-800">{field.label || "Untitled field"}</label>
            {field.isRequired && <span className="text-red-500 text-xs">*</span>}
          </div>
          {field.description && <p className="text-xs text-gray-400">{field.description}</p>}
          {field.type === "YES_NO" ? (
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-600"><input type="radio" disabled /> Yes</label>
              <label className="flex items-center gap-2 text-sm text-gray-600"><input type="radio" disabled /> No</label>
            </div>
          ) : (
            <input disabled
              type={field.type === "PASSWORD" ? "password" : field.type === "NUMBER" ? "number" : field.type === "EMAIL" ? "email" : "text"}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase() || "value"}…`}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 outline-none cursor-not-allowed" />
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function FormBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [fields, setFields] = useState<FormField[]>([]);
  const [draft, setDraft] = useState<Omit<FormField, "id" | "orderIndex">>(emptyDraft());
  const [isSaving, setIsSaving] = useState(false);
  const [draftError, setDraftError] = useState("");



  const setDraftField = (patch: Partial<typeof draft>) => setDraft((d) => ({ ...d, ...patch }));

  const { form, isLoading: isLoadingForm } = useGetForm(id);
  const { updateFieldAsync } = useUpdateField(id);

  // which field is currently being edited
  // const [editingId, setEditingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [editDraft, setEditDraft] = useState<Omit<FormField, "id" | "orderIndex">>(emptyDraft());

  const { createFieldAsync, status: createStatus } = useCreateField(id);
  const { deleteFieldAsync, status: deleteStatus } = useDeleteField(id);

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
      }))
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

      // merge DB response with the draft you already have
      setFields((prev) => [
        ...prev,
        {
          id: saved.id,
          label: draft.label,
          labelKey: saved.labelKey, // use server-generated labelKey
          description: draft.description,
          placeholder: draft.placeholder,
          isRequired: draft.isRequired,
          orderIndex: Number(saved.orderIndex), // numeric comes back as string
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
      await deleteFieldAsync({ fieldId }); // call your tRPC delete mutation
      setFields((prev) =>
        prev.filter((f) => f.id !== fieldId).map((f, i) => ({ ...f, orderIndex: i + 1 })),
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
    setFields((prev) =>
      prev.map((f) => f.id === fieldId ? { ...f, ...editDraft } : f)
    );
    cancelEditing();
  } catch (e) {
    console.error("Failed to update field");
  }
};

  return (
    <div className="flex flex-1 flex-col h-screen overflow-hidden">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 shrink-0">
        <div>
          <h2 className="text-lg font-semibold">Form Builder</h2>
          <p className="text-xs text-gray-400">
            {fields.length} field{fields.length !== 1 ? "s" : ""} added
          </p>
        </div>
        {/* <button
          onClick={handleSave}
          disabled={isSaving || fields.length === 0}
          className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving…" : "Save Fields"}
        </button> */}
      </div>

      {isLoadingFields ? (
  <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
    Loading fields…
  </div>
) : (
  <div className="flex flex-1 overflow-hidden">
    <div className="flex flex-1 overflow-hidden">
        {/* ── Left — field builder ── */}
        <div className="w-[380px] shrink-0 border-r border-gray-200 flex flex-col overflow-y-auto">
          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">New field</p>

            {/* Label */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Full name"
                value={draft.label}
                onChange={(e) =>
                  setDraftField({ label: e.target.value, labelKey: toLabelKey(e.target.value) })
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
              />
              {draftError && <p className="text-xs text-red-500">{draftError}</p>}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <div className="relative">
                <select
                  value={draft.type}
                  onChange={(e) => setDraftField({ type: e.target.value as FieldType })}
                  className="w-full appearance-none rounded-lg border border-gray-200  pl-3 pr-8 py-2 text-sm outline-none transition focus:border-gray-400 cursor-pointer"
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            {/* Placeholder — hide for YES_NO */}
            {draft.type !== "YES_NO" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Placeholder</label>
                <input
                  type="text"
                  placeholder="e.g. Enter your full name"
                  value={draft.placeholder}
                  onChange={(e) => setDraftField({ placeholder: e.target.value })}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
                />
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Short description</label>
              <input
                type="text"
                placeholder="Help text shown below the field"
                value={draft.description}
                onChange={(e) => setDraftField({ description: e.target.value })}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-gray-400"
              />
            </div>

            {/* Key — auto derived */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Key</label>
              <input
                type="text"
                value={draft.labelKey}
                onChange={(e) => setDraftField({ labelKey: e.target.value })}
                placeholder="auto_generated"
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-mono outline-none transition focus:border-gray-400 text-gray-500"
              />
            </div>

            {/* Required */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={draft.isRequired}
                onChange={(e) => setDraftField({ isRequired: e.target.checked })}
                className="rounded accent-black"
              />
              <span className="text-sm text-gray-700">Mark as required</span>
            </label>

            {/* Add button */}
            <button
              onClick={handleAddField}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <Plus size={15} />
              Add field
            </button>
          </div>
        </div>

        {/* ── Right — form preview ── */}
        <div className="flex-1 overflow-y-auto ">
          <div className="max-w-xl mx-auto py-10 px-6 flex flex-col gap-6">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
                Preview
              </p>

              {fields.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
                  <div className="rounded-xl border border-dashed border-gray-300 p-5">
                    <Plus size={24} className="text-gray-300 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-400">Add your first field from the left panel.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-200  p-6 flex flex-col gap-6">
                  {fields.map((field) => (
                      <PreviewField
                        key={field.id}
                        field={field}
                        isEditing={editingId === field.id}
                        editDraft={editDraft}
                        onEditDraftChange={(patch) => setEditDraft((d) => ({ ...d, ...patch }))}
                        onStartEdit={() => startEditing(field)}
                        onSaveEdit={() => handleEditSave(field.id)}
                        onCancelEdit={cancelEditing}
                        onRemove={() => removeField(field.id)}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  </div>
)}

      
    </div>
  );
}
