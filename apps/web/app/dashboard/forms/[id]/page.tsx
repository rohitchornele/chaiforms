"use client";

import Link from "next/link";

import { use, useEffect, useRef, useState } from "react";

import { ArrowLeft, Eye, Loader2, SlidersHorizontal } from "lucide-react";

import { toast } from "sonner";

import { BuilderSidebar } from "~/components/forms/builder/builder-sidebar";
import { FieldInspector } from "~/components/forms/builder/field-inspector";
import { FormPreview, type PreviewDevice } from "~/components/forms/builder/form-preview";
import { FIELD_TYPES, type BuilderField, type FieldType } from "~/components/forms/builder/types";

import {
  useCreateField,
  useDeleteField,
  useGetFields,
  useGetForm,
  useReorderFields,
  useUpdateField,
  useUpdateForm,
} from "~/hooks/api/form";

import type { FormTheme } from "~/lib/form-themes";

import { trpc } from "~/trpc/client";

const quietActionClass =
  "flex h-11 items-center gap-2 rounded-lg border border-cf-line px-3.5 text-sm font-medium text-cf-text transition-colors hover:bg-cf-raised";

export default function FormBuilderPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);

  const utils = trpc.useUtils();

  const { forms, isLoading: isLoadingForm, error: formError } = useGetForm(id);

  const { fields: existingFields, isLoading: isLoadingFields } = useGetFields(id);

  const { createFieldAsync } = useCreateField(id);

  const { updateFieldAsync } = useUpdateField(id);

  const { deleteFieldAsync } = useDeleteField(id);

  const { reorderFieldsAsync } = useReorderFields(id);

  const { updateFormAsync } = useUpdateForm();

  const [fields, setFields] = useState<BuilderField[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [theme, setTheme] = useState<FormTheme>("sacred-tech");

  const [device, setDevice] = useState<PreviewDevice>("desktop");

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);

  const inspectorRef = useRef<HTMLElement>(null);

  // Server data only replaces local state when there is nothing unsaved to lose.
  useEffect(() => {
    if (!existingFields || hasUnsavedChanges) return;

    const next = existingFields.map((f) => ({
      id: f.fieldId,
      label: f.label,
      description: f.description ?? "",
      placeholder: f.placeholder ?? "",
      isRequired: f.isRequired,
      type: f.type as FieldType,
    }));

    setFields(next);

    setSelectedId((current) =>
      next.some((f) => f.id === current) ? current : (next[0]?.id ?? null),
    );
  }, [existingFields, hasUnsavedChanges]);

  useEffect(() => {
    if (forms?.theme && !hasUnsavedChanges) setTheme(forms.theme as FormTheme);
  }, [forms?.theme, hasUnsavedChanges]);

  const isPublished = forms?.status === "PUBLISHED";

  const selectedIndex = fields.findIndex((f) => f.id === selectedId);

  const selectedField = fields[selectedIndex] ?? null;

  const isBusy = isSaving || isPublishing;

  // On stacked layouts the settings panel sits below the preview.
  const revealInspector = () => {
    if (!window.matchMedia("(max-width: 1279px)").matches) return;

    requestAnimationFrame(() => {
      inspectorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const selectField = (fieldId: string) => {
    setSelectedId(fieldId);

    revealInspector();
  };

  const addField = (type: FieldType) => {
    const fieldType = FIELD_TYPES.find((t) => t.value === type);

    const field: BuilderField = {
      id: crypto.randomUUID(),
      label: `New ${fieldType?.label.toLowerCase() ?? "text"} field`,
      description: "",
      placeholder: "",
      isRequired: false,
      type,
    };

    setFields((prev) => [...prev, field]);

    setHasUnsavedChanges(true);

    selectField(field.id);
  };

  const updateSelectedField = (changes: Partial<BuilderField>) => {
    setFields((prev) => prev.map((f) => (f.id === selectedId ? { ...f, ...changes } : f)));

    setHasUnsavedChanges(true);
  };

  const moveSelectedField = (offset: -1 | 1) => {
    const target = selectedIndex + offset;

    const moved = fields[selectedIndex];

    if (!moved || target < 0 || target >= fields.length) return;

    const next = fields.filter((f) => f.id !== moved.id);

    next.splice(target, 0, moved);

    setFields(next);

    setHasUnsavedChanges(true);
  };

  const deleteSelectedField = () => {
    if (!selectedField) return;

    const removed = selectedField;

    const removedIndex = selectedIndex;

    const remaining = fields.filter((f) => f.id !== removed.id);

    setFields(remaining);

    setSelectedId((remaining[removedIndex] ?? remaining[removedIndex - 1])?.id ?? null);

    setHasUnsavedChanges(true);

    toast(`Deleted "${removed.label || "Untitled field"}"`, {
      action: {
        label: "Undo",
        onClick: () => {
          setFields((prev) => {
            const next = [...prev];

            next.splice(Math.min(removedIndex, next.length), 0, removed);

            return next;
          });

          setSelectedId(removed.id);
        },
      },
    });
  };

  const changeTheme = (next: FormTheme) => {
    if (next === theme) return;

    setTheme(next);

    setHasUnsavedChanges(true);
  };

  const buildFormUpdate = () => {
    if (!forms) throw new Error("Form is not loaded");

    return {
      formId: forms.formId,
      title: forms.title,
      description: forms.description ?? null,
      visibility: forms.visibility,
      isPasswordProtected: forms.isPasswordProtected,
      publishedAt: forms.publishedAt ?? null,
      expiryDate: forms.expiryDate ?? null,
      responseLimit: forms.responseLimit ?? null,
      theme,
      status: forms.status,
    };
  };

  const saveChanges = async () => {
    if (!forms) return false;

    const unlabelled = fields.find((f) => !f.label.trim());

    if (unlabelled) {
      selectField(unlabelled.id);

      toast.error("Every field needs a label before you can save.");

      return false;
    }

    setIsSaving(true);

    try {
      const savedIds = existingFields?.map((f) => f.fieldId) ?? [];

      const currentIds = new Set(fields.map((f) => f.id));

      for (const fieldId of savedIds.filter((savedId) => !currentIds.has(savedId))) {
        await deleteFieldAsync({ fieldId });
      }

      const orderedIds: string[] = [];

      const createdIds: string[] = [];

      for (const field of fields) {
        if (savedIds.includes(field.id)) {
          await updateFieldAsync({
            fieldId: field.id,
            label: field.label,
            type: field.type,
            description: field.description,
            placeholder: field.placeholder,
            isRequired: field.isRequired,
          });

          orderedIds.push(field.id);
        } else {
          const created = await createFieldAsync({
            formId: id,
            label: field.label,
            type: field.type,
            description: field.description,
            placeholder: field.placeholder,
            isRequired: field.isRequired,
          });

          // Keep the real id locally so a retry after a later failure can't duplicate it.
          setFields((prev) =>
            prev.map((f) => (f.id === field.id ? { ...f, id: created.id } : f)),
          );

          setSelectedId((current) => (current === field.id ? created.id : current));

          orderedIds.push(created.id);

          createdIds.push(created.id);
        }
      }

      // New fields are always appended, so only an actual move needs a reorder.
      const orderInDatabase = [...savedIds.filter((f) => currentIds.has(f)), ...createdIds];

      if (orderedIds.join() !== orderInDatabase.join()) {
        await reorderFieldsAsync({ formId: id, fieldIds: orderedIds });
      }

      if (theme !== forms.theme) {
        await updateFormAsync(buildFormUpdate());
      }

      await Promise.all([
        utils.form.getField.invalidate({ formId: id }),
        utils.form.getFormById.invalidate({ formId: id }),
      ]);

      setHasUnsavedChanges(false);

      return true;
    } catch (err) {
      console.error(err);

      toast.error("We couldn't save your changes. Please try again.");

      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (await saveChanges()) toast.success("Changes saved");
  };

  const handlePublishToggle = async () => {
    if (!forms) return;

    if (hasUnsavedChanges && !(await saveChanges())) return;

    setIsPublishing(true);

    try {
      await updateFormAsync({
        ...buildFormUpdate(),
        publishedAt: isPublished ? null : new Date(),
        status: isPublished ? "DRAFT" : "PUBLISHED",
      });

      await utils.form.getFormById.invalidate({ formId: id });

      toast.success(isPublished ? "Form unpublished" : "Form published");
    } catch (err) {
      console.error(err);

      toast.error(`We couldn't ${isPublished ? "unpublish" : "publish"} this form.`);
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoadingForm || isLoadingFields) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center" role="status">
        <Loader2 aria-hidden="true" className="size-6 animate-spin text-cf-text" />
        <span className="sr-only">Loading form</span>
      </div>
    );
  }

  if (formError || !forms) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-cf-text">We couldn't load this form.</p>

        <Link href="/dashboard/forms" className={quietActionClass}>
          <ArrowLeft aria-hidden="true" size={16} />
          Back to forms
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-cf-line bg-cf-ground font-[family-name:var(--font-geist-sans)] text-sm text-cf-text">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-cf-line bg-cf-panel px-5 py-3">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <Link
            href="/dashboard/forms"
            aria-label="Back to forms"
            className="flex size-11 items-center justify-center rounded-lg border border-cf-line transition-colors hover:bg-cf-raised"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </Link>

          <h1 className="min-w-0 text-lg font-semibold tracking-tight break-words">{forms.title}</h1>

          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              isPublished ? "border-[#7FD6A8] text-[#7FD6A8]" : "border-[#E8B765] text-[#E8B765]"
            }`}
          >
            {isPublished ? "Published" : "Draft"}
          </span>

          <span
            role="status"
            className={`text-[13px] ${hasUnsavedChanges ? "text-cf-accent-soft" : "text-cf-muted"}`}
          >
            {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isPublished ? (
            <Link
              href={`/form/public/${forms.slug}`}
              target="_blank"
              className={quietActionClass}
            >
              <Eye aria-hidden="true" size={16} />
              Open form
            </Link>
          ) : (
            <button
              type="button"
              disabled
              title="Publish this form to open its public page"
              className={`${quietActionClass} cursor-not-allowed text-cf-muted hover:bg-transparent`}
            >
              <Eye aria-hidden="true" size={16} />
              Open form
            </button>
          )}

          <Link href={`/dashboard/forms/${id}/settings`} className={quietActionClass}>
            <SlidersHorizontal aria-hidden="true" size={16} />
            Settings
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isBusy}
            className={`flex h-11 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
              hasUnsavedChanges
                ? "border-cf-line-strong text-cf-text hover:bg-cf-raised"
                : "border-cf-line text-cf-muted"
            }`}
          >
            {isSaving && <Loader2 aria-hidden="true" size={16} className="animate-spin" />}
            Save
          </button>

          <button
            type="button"
            onClick={handlePublishToggle}
            disabled={isBusy}
            className="flex h-11 items-center gap-2 rounded-lg bg-cf-accent px-4.5 text-sm font-semibold text-cf-ground transition-colors hover:bg-cf-accent-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPublishing && <Loader2 aria-hidden="true" size={16} className="animate-spin" />}
            {isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      </header>

      <div className="grid xl:grid-cols-[248px_minmax(0,1fr)_288px]">
        <BuilderSidebar theme={theme} onAddField={addField} onThemeChange={changeTheme} />

        <FormPreview
          title={forms.title}
          description={forms.description}
          fields={fields}
          selectedId={selectedId}
          theme={theme}
          device={device}
          onDeviceChange={setDevice}
          onSelectField={selectField}
        />

        <FieldInspector
          ref={inspectorRef}
          field={selectedField}
          canMoveUp={selectedIndex > 0}
          canMoveDown={selectedIndex >= 0 && selectedIndex < fields.length - 1}
          onChange={updateSelectedField}
          onMove={moveSelectedField}
          onDelete={deleteSelectedField}
        />
      </div>
    </div>
  );
}
