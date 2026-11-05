"use client";

import { forwardRef } from "react";

import { FIELD_TYPES, type BuilderField, type FieldType } from "./types";

type Props = {
  field: BuilderField | null;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onChange: (changes: Partial<BuilderField>) => void;
  onMove: (offset: -1 | 1) => void;
  onDelete: () => void;
};

const controlClass =
  "rounded-lg border border-cf-line-strong bg-cf-ground px-3 text-sm text-cf-text placeholder:text-cf-muted";

const moveButtonClass =
  "min-h-11 flex-1 rounded-lg border border-cf-line px-2.5 text-sm whitespace-nowrap text-cf-text transition-colors hover:bg-cf-raised disabled:cursor-not-allowed disabled:text-cf-muted disabled:hover:bg-transparent";

export const FieldInspector = forwardRef<HTMLElement, Props>(function FieldInspector(
  { field, canMoveUp, canMoveDown, onChange, onMove, onDelete },
  ref,
) {
  const isLabelMissing = field !== null && !field.label.trim();

  return (
    <aside
      ref={ref}
      aria-label="Field settings"
      className="flex scroll-mt-4 flex-col gap-4 border-t border-cf-line bg-cf-panel p-5 xl:border-t-0 xl:border-l"
    >
      <h2 className="text-[13px] font-semibold text-cf-subtle">Field settings</h2>

      {!field ? (
        <p className="text-sm text-cf-muted">Select a field in the preview to edit it.</p>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="field-label" className="text-sm font-medium text-cf-text">
              Label
            </label>

            <input
              id="field-label"
              type="text"
              maxLength={100}
              value={field.label}
              aria-invalid={isLabelMissing}
              aria-describedby={isLabelMissing ? "field-label-error" : undefined}
              onChange={(e) => onChange({ label: e.target.value })}
              className={`h-11 ${controlClass} ${isLabelMissing ? "border-cf-danger" : ""}`}
            />

            {isLabelMissing && (
              <p id="field-label-error" className="text-[13px] text-cf-danger">
                Give this field a label so people know what to enter.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="field-type" className="text-sm font-medium text-cf-text">
              Type
            </label>

            <select
              id="field-type"
              value={field.type}
              onChange={(e) => onChange({ type: e.target.value as FieldType })}
              className={`h-11 ${controlClass}`}
            >
              {FIELD_TYPES.map((type) => (
                <option key={type.value} value={type.value} className="bg-cf-panel">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {field.type === "PASSWORD" && (
            <p className="rounded-lg border border-cf-line-strong p-3 text-[13px] text-cf-subtle">
              Answers are hidden while typing, but you can read them in submissions as plain text.
              Never use this field to collect real account passwords.
            </p>
          )}

          {field.type !== "YES_NO" && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="field-placeholder" className="text-sm font-medium text-cf-text">
                Placeholder
              </label>

              <input
                id="field-placeholder"
                type="text"
                value={field.placeholder}
                onChange={(e) => onChange({ placeholder: e.target.value })}
                className={`h-11 ${controlClass}`}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="field-description" className="text-sm font-medium text-cf-text">
              Help text
            </label>

            <textarea
              id="field-description"
              rows={3}
              value={field.description}
              placeholder="Optional hint shown under the label"
              onChange={(e) => onChange({ description: e.target.value })}
              className={`resize-y py-2.5 ${controlClass}`}
            />
          </div>

          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-cf-line px-3 text-sm font-medium text-cf-text">
            <input
              type="checkbox"
              checked={field.isRequired}
              onChange={(e) => onChange({ isRequired: e.target.checked })}
              className="size-[18px] accent-cf-accent"
            />
            Required
          </label>

          <div className="flex flex-wrap gap-2 border-t border-cf-line pt-3">
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={() => onMove(-1)}
              className={moveButtonClass}
            >
              Move up
            </button>

            <button
              type="button"
              disabled={!canMoveDown}
              onClick={() => onMove(1)}
              className={moveButtonClass}
            >
              Move down
            </button>

            <button
              type="button"
              onClick={onDelete}
              className="min-h-11 w-full rounded-lg border border-cf-line px-2.5 text-sm text-cf-danger transition-colors hover:bg-cf-raised"
            >
              Delete field
            </button>
          </div>
        </div>
      )}
    </aside>
  );
});
