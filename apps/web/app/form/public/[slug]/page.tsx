"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Loader2, AlertCircle } from "lucide-react";

import { useGetPublicForm, useVerifyFormPassword, useSubmitForm } from "~/hooks/api/form";

import { FORM_THEMES, type FormTheme } from "~/lib/form-themes";

export default function PublicFormPage() {
  const params = useParams();

  const slug = params.slug as string;

  const { form, isLoading, error } = useGetPublicForm(slug);

  const [password, setPassword] = useState("");

  const [isUnlocked, setIsUnlocked] = useState(false);

  const [values, setValues] = useState<Record<string, string>>({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    verifyPasswordAsync,
    isPending: isVerifyingPassword,
    error: passwordError,
  } = useVerifyFormPassword();

  const { submitFormAsync, isPending: isSubmitting } = useSubmitForm();

  const handleVerifyPassword = async () => {
    await verifyPasswordAsync({
      slug,

      password,
    });

    setIsUnlocked(true);
  };

  const handleChange = (fieldId: string, value: string) => {
    setValues((prev) => ({
      ...prev,

      [fieldId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form) return;

    await submitFormAsync({
      formId: form.formId,
      responses: values,
    });

    setIsSubmitted(true);
  };

  const theme = FORM_THEMES[(form?.theme ?? "sacred-tech") as FormTheme];

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-900">🎉 Submitted</h1>

          <p className="mt-3 text-zinc-500">Your response has been recorded successfully.</p>
        </div>
      </div>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100">
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />

          <p className="text-sm font-medium text-zinc-700">Loading form...</p>
        </div>
      </div>
    );
  }

  // Password Screen
  if (form?.isPasswordProtected && !isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Protected Form</h1>

          <p className="mt-2 text-sm text-zinc-500">Enter password to continue</p>

          <div className="mt-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`
  w-full
  rounded-2xl
  border
  px-4
  py-3
  outline-none
  transition
  ${theme.input}
`}
            />
          </div>

          {passwordError && (
            <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {passwordError.message}
            </div>
          )}

          <button
            onClick={handleVerifyPassword}
            disabled={isVerifyingPassword}
            className="mt-5 w-full rounded-2xl bg-zinc-900 px-4 py-3 text-white transition hover:bg-black disabled:opacity-50"
          >
            {isVerifyingPassword ? "Verifying..." : "Unlock Form"}
          </button>
        </div>
      </div>
    );
  }

  // Error Screen
  if (error || !form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">{error?.message || "Form not found"}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
    relative
    min-h-screen
    overflow-hidden
    p-4
    md:p-10
    ${theme.page}
  `}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
      absolute inset-0
      bg-gradient-to-br
      ${theme.backgroundGlow}
    `}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
      absolute inset-0
      bg-gradient-to-br
      ${theme.backgroundGlow}
    `}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      <div
        className={`
    relative
    mx-auto
    max-w-3xl
    rounded-[32px]
    p-6
    shadow-2xl
    backdrop-blur-3xl
    md:p-10
    ${theme.card}
  `}
      >
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`
    text-3xl
    font-bold
    tracking-tight
    ${theme.title}
  `}
          >
            {form.title}
          </h1>

          {form.description && (
            <p
              className={`
    mt-3
    leading-relaxed
    ${theme.description}
  `}
            >
              {form.description}
            </p>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-6">
          {form.fields.map((field) => (
            <div key={field.fieldId}>
              <label
                className={`
  text-sm
  font-medium
  ${theme.label}
`}
              >
                {field.label}

                {field.isRequired && <span className="ml-1 text-red-500">*</span>}
              </label>

              {field.description && (
                <p className="mb-2 text-sm text-zinc-500">{field.description}</p>
              )}

              <input
                type="text"
                value={values[field.fieldId] || ""}
                onChange={(e) =>
                  handleChange(
                    field.fieldId,

                    e.target.value,
                  )
                }
                placeholder={field.placeholder || ""}
                className={`
  w-full
  rounded-2xl
  border
  px-4
  py-3
  outline-none
  transition
  ${theme.input}
`}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
  mt-8
  w-full
  rounded-2xl
  px-5
  py-3
  text-sm
  font-medium
  transition
  ${theme.button}
`}
        >
          {isSubmitting ? "Submitting..." : "Submit Form"}
        </button>
      </div>
    </div>
  );
}
