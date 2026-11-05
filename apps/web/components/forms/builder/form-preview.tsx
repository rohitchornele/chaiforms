"use client";

import { FORM_THEMES, type FormTheme } from "~/lib/form-themes";

import type { BuilderField } from "./types";

export type PreviewDevice = "desktop" | "phone";

type Props = {
  title: string;
  description?: string | null;
  fields: BuilderField[];
  selectedId: string | null;
  theme: FormTheme;
  device: PreviewDevice;
  onDeviceChange: (device: PreviewDevice) => void;
  onSelectField: (fieldId: string) => void;
};

const DEVICES: { value: PreviewDevice; label: string }[] = [
  { value: "desktop", label: "Desktop" },
  { value: "phone", label: "Phone" },
];

export function FormPreview({
  title,
  description,
  fields,
  selectedId,
  theme,
  device,
  onDeviceChange,
  onSelectField,
}: Props) {
  const styles = FORM_THEMES[theme];

  return (
    <div className="flex min-w-0 flex-col gap-3.5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <h2 className="text-[13px] font-semibold text-cf-subtle">
          Live preview · {fields.length} {fields.length === 1 ? "field" : "fields"}
        </h2>

        <div
          role="group"
          aria-label="Preview size"
          className="flex gap-1 rounded-lg border border-cf-line p-[3px]"
        >
          {DEVICES.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={device === option.value}
              onClick={() => onDeviceChange(option.value)}
              className={`min-h-[38px] rounded-md px-3.5 text-[13px] font-medium transition-colors ${
                device === option.value ? "bg-cf-line text-cf-text" : "text-cf-muted hover:text-cf-text"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`relative flex flex-1 items-start justify-center overflow-hidden rounded-2xl border border-cf-line px-3 py-8 sm:px-5 ${styles.page}`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.backgroundGlow}`}
        />

        <div
          className={`relative w-full rounded-2xl px-3 py-7 transition-[max-width] sm:px-5 ${styles.card} ${
            device === "desktop" ? "max-w-[640px]" : "max-w-[360px]"
          }`}
        >
          <div className="px-3 pb-4">
            <h3
              className={`text-[28px] leading-tight font-bold tracking-tight break-words ${styles.title}`}
            >
              {title}
            </h3>

            {description && (
              <p className={`mt-2.5 text-[15px] ${styles.description}`}>{description}</p>
            )}
          </div>

          {fields.length === 0 ? (
            <p
              className={`mx-3 mb-4 rounded-xl border border-dashed px-4 py-7 text-center ${styles.input} ${styles.description}`}
            >
              This form has no fields yet. Add the first one from the list.
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {fields.map((field) => (
                <button
                  key={field.id}
                  type="button"
                  aria-pressed={field.id === selectedId}
                  onClick={() => onSelectField(field.id)}
                  className={`flex w-full flex-col gap-2 rounded-xl border p-3 text-left text-sm transition-colors ${
                    field.id === selectedId
                      ? styles.selectedField
                      : "border-transparent hover:border-cf-line-strong"
                  }`}
                >
                  <span className={`font-medium break-words ${styles.label}`}>
                    {field.label || "Untitled field"}
                    {field.isRequired && (
                      <span className={styles.accent}>
                        {" *"}
                        <span className="sr-only">required</span>
                      </span>
                    )}
                  </span>

                  {field.description && (
                    <span className={`text-[13px] break-words ${styles.description}`}>
                      {field.description}
                    </span>
                  )}

                  {field.type === "YES_NO" ? (
                    <span className="flex gap-2">
                      {["Yes", "No"].map((choice) => (
                        <span
                          key={choice}
                          className={`flex-1 rounded-lg border p-2.5 text-center ${styles.input}`}
                        >
                          {choice}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span
                      className={`block min-h-[42px] rounded-lg border px-3 py-2.5 break-words ${styles.input} ${styles.placeholderText}`}
                    >
                      {field.placeholder || (field.type === "PASSWORD" ? "••••••••" : "")}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="px-3 pt-4">
            <span
              aria-hidden="true"
              className={`block rounded-lg p-3 text-center font-semibold ${styles.button}`}
            >
              Submit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
