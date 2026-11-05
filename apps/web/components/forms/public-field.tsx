"use client";

import type { FormTheme } from "~/lib/form-themes";
import { FORM_THEMES } from "~/lib/form-themes";

export type PublicField = {
  fieldId: string;
  label: string;
  type: "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD";
  isRequired: boolean;
  placeholder?: string | null;
  description?: string | null;
};

const INPUT_ATTRIBUTES = {
  TEXT: { type: "text" },
  NUMBER: { type: "number", inputMode: "decimal", step: "any" },
  EMAIL: { type: "email", inputMode: "email", autoComplete: "email" },
  PASSWORD: { type: "password", autoComplete: "new-password" },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getFieldError(field: PublicField, rawValue: string | undefined) {
  const value = (rawValue ?? "").trim();

  if (!value) {
    if (!field.isRequired) return undefined;

    return field.type === "YES_NO" ? "Please choose Yes or No." : "This field is required.";
  }

  if (field.type === "EMAIL" && !EMAIL_PATTERN.test(value)) {
    return "Enter a valid email address, like you@example.com.";
  }

  if (field.type === "NUMBER" && !Number.isFinite(Number(value))) {
    return "Enter a number.";
  }

  return undefined;
}

type Props = {
  field: PublicField;
  theme: FormTheme;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function PublicFormField({ field, theme, value, error, onChange }: Props) {
  const styles = FORM_THEMES[theme];

  const inputId = `field-${field.fieldId}`;
  const hintId = field.description ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const requiredMark = field.isRequired && (
    <span className={styles.accent}>
      {" *"}
      <span className="sr-only">required</span>
    </span>
  );

  const hint = field.description && (
    <p id={hintId} className={`text-[13px] break-words ${styles.description}`}>
      {field.description}
    </p>
  );

  const errorMessage = error && (
    <p id={errorId} className="text-[13px] text-cf-danger">
      {error}
    </p>
  );

  if (field.type === "YES_NO") {
    return (
      <fieldset aria-describedby={describedBy} className="flex min-w-0 flex-col gap-2">
        <legend className={`mb-2 text-sm font-medium break-words ${styles.label}`}>
          {field.label}
          {requiredMark}
        </legend>

        {hint}

        <div className="flex gap-2">
          {["Yes", "No"].map((choice) => (
            <label
              key={choice}
              className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-lg border p-2.5 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-current ${
                value === choice ? `${styles.selectedField} ${styles.label}` : styles.input
              }`}
            >
              <input
                type="radio"
                name={inputId}
                value={choice}
                checked={value === choice}
                onChange={() => onChange(choice)}
                className="sr-only"
              />
              {choice}
            </label>
          ))}
        </div>

        {errorMessage}
      </fieldset>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className={`text-sm font-medium break-words ${styles.label}`}>
        {field.label}
        {requiredMark}
      </label>

      {hint}

      <input
        {...INPUT_ATTRIBUTES[field.type]}
        id={inputId}
        value={value}
        placeholder={field.placeholder ?? ""}
        aria-required={field.isRequired}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-11 w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${styles.input} ${styles.focusRing} ${
          error ? "border-cf-danger" : ""
        }`}
      />

      {errorMessage}
    </div>
  );
}
