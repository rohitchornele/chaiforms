"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { useParams } from "next/navigation";

import { AlertCircle, Check, Loader2 } from "lucide-react";

import {
  getFieldError,
  PublicFormField,
  type PublicField,
} from "~/components/forms/public-field";

import { useGetPublicForm, useSubmitForm, useVerifyFormPassword } from "~/hooks/api/form";

import { FORM_THEMES, type FormTheme } from "~/lib/form-themes";

function ThemedPage({ theme, children }: { theme: FormTheme; children: ReactNode }) {
  const styles = FORM_THEMES[theme];

  return (
    <main
      className={`relative min-h-screen overflow-hidden p-4 font-[family-name:var(--font-geist-sans)] md:p-10 ${styles.page}`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.backgroundGlow}`}
      />

      <div className="relative">{children}</div>
    </main>
  );
}

function MessageCard({ theme, children }: { theme: FormTheme; children: ReactNode }) {
  return (
    <ThemedPage theme={theme}>
      <div className="flex min-h-[calc(100vh-2rem)] items-center justify-center md:min-h-[calc(100vh-5rem)]">
        <div className={`w-full max-w-md rounded-2xl p-6 md:p-8 ${FORM_THEMES[theme].card}`}>
          {children}
        </div>
      </div>
    </ThemedPage>
  );
}

export default function PublicFormPage() {
  const params = useParams();

  const slug = params.slug as string;

  const { form, isLoading, error } = useGetPublicForm(slug);

  const [password, setPassword] = useState("");

  const [unlockedFields, setUnlockedFields] = useState<PublicField[] | null>(null);

  const [values, setValues] = useState<Record<string, string>>({});

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [submitError, setSubmitError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    verifyPasswordAsync,
    isPending: isVerifyingPassword,
    error: passwordError,
  } = useVerifyFormPassword();

  const { submitFormAsync, isPending: isSubmitting } = useSubmitForm();

  const theme: FormTheme = form?.theme && form.theme in FORM_THEMES ? form.theme : "sacred-tech";

  const styles = FORM_THEMES[theme];

  // The API only sends a protected form's fields after its password is verified.
  const fields: PublicField[] = unlockedFields ?? form?.fields ?? [];

  const handleVerifyPassword = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const result = await verifyPasswordAsync({ slug, password });

      setUnlockedFields(result.fields);
    } catch (err) {
      // The hook's error state shows the message under the input.
      console.error(err);
    }
  };

  const handleChange = (field: PublicField, value: string) => {
    setValues((prev) => ({ ...prev, [field.fieldId]: value }));

    setFieldErrors((prev) => {
      const next = { ...prev };

      delete next[field.fieldId];

      return next;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form) return;

    const nextErrors: Record<string, string> = {};

    for (const field of fields) {
      const fieldError = getFieldError(field, values[field.fieldId]);

      if (fieldError) nextErrors[field.fieldId] = fieldError;
    }

    setFieldErrors(nextErrors);

    setSubmitError("");

    const firstInvalid = fields.find((field) => nextErrors[field.fieldId]);

    if (firstInvalid) {
      const inputId = `field-${firstInvalid.fieldId}`;

      const target =
        document.getElementById(inputId) ??
        document.querySelector<HTMLElement>(`[name="${inputId}"]`);

      target?.focus();

      return;
    }

    const responses = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value.trim() !== ""),
    );

    try {
      await submitFormAsync({
        formId: form.formId,
        responses,
        password: form.isPasswordProtected ? password : undefined,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);

      // Form rules (expired, response limit reached...) come with a readable message.
      const rejection = err as { message?: string; data?: { code?: string } };

      setSubmitError(
        rejection.data?.code === "PRECONDITION_FAILED" && rejection.message
          ? rejection.message
          : "We couldn't submit your response. Please try again.",
      );
    }
  };

  if (isLoading) {
    return (
      <ThemedPage theme={theme}>
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center" role="status">
          <Loader2 aria-hidden="true" className="size-6 animate-spin" />
          <span className="sr-only">Loading form</span>
        </div>
      </ThemedPage>
    );
  }

  if (error || !form) {
    return (
      <MessageCard theme={theme}>
        <div className="flex items-start gap-3" role="alert">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cf-danger" />

          <div>
            <h1 className={`text-lg font-semibold ${styles.title}`}>This form isn&apos;t available</h1>

            <p className={`mt-1 text-sm ${styles.description}`}>
              {error?.message || "Form not found"}
            </p>
          </div>
        </div>
      </MessageCard>
    );
  }

  if (isSubmitted) {
    return (
      <MessageCard theme={theme}>
        <div className="text-center" role="status">
          <span
            aria-hidden="true"
            className={`mx-auto flex size-11 items-center justify-center rounded-full ${styles.button}`}
          >
            <Check className="size-5" />
          </span>

          <h1 className={`mt-4 text-2xl font-bold tracking-tight ${styles.title}`}>
            Response submitted
          </h1>

          <p className={`mt-2 text-sm ${styles.description}`}>
            Thanks. Your response to {form.title} has been recorded.
          </p>
        </div>
      </MessageCard>
    );
  }

  if (form.isPasswordProtected && !unlockedFields) {
    return (
      <MessageCard theme={theme}>
        <form onSubmit={handleVerifyPassword} className="flex flex-col gap-5">
          <div>
            <h1 className={`text-2xl font-bold tracking-tight break-words ${styles.title}`}>
              {form.title}
            </h1>

            <p className={`mt-2 text-sm ${styles.description}`}>
              This form is protected. Enter the password to continue.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="form-password" className={`text-sm font-medium ${styles.label}`}>
              Password
            </label>

            <input
              id="form-password"
              type="password"
              required
              value={password}
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "form-password-error" : undefined}
              onChange={(e) => setPassword(e.target.value)}
              className={`min-h-11 w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${styles.input} ${styles.focusRing}`}
            />

            {passwordError && (
              <p id="form-password-error" className="text-[13px] text-cf-danger">
                {passwordError.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifyingPassword}
            className={`min-h-11 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${styles.button}`}
          >
            {isVerifyingPassword ? "Checking..." : "Continue"}
          </button>
        </form>
      </MessageCard>
    );
  }

  return (
    <ThemedPage theme={theme}>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`mx-auto max-w-[640px] rounded-2xl p-6 md:p-10 ${styles.card}`}
      >
        <div className="mb-8">
          <h1
            className={`text-[28px] leading-tight font-bold tracking-tight break-words ${styles.title}`}
          >
            {form.title}
          </h1>

          {form.description && (
            <p className={`mt-2.5 text-[15px] leading-relaxed ${styles.description}`}>
              {form.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {fields.map((field) => (
            <PublicFormField
              key={field.fieldId}
              field={field}
              theme={theme}
              value={values[field.fieldId] ?? ""}
              error={fieldErrors[field.fieldId]}
              onChange={(value) => handleChange(field, value)}
            />
          ))}
        </div>

        {submitError && (
          <p role="alert" className="mt-6 text-sm text-cf-danger">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-8 min-h-11 w-full rounded-lg px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${styles.button}`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </ThemedPage>
  );
}
