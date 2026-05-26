"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import {
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import {
  useGetFormAndField,
  useSubmitForm,
} from "~/hooks/api/form";

type Field = {
  fieldId: string;
  label: string;
  labelKey?: string;
  type:
    | "TEXT"
    | "NUMBER"
    | "EMAIL"
    | "YES_NO"
    | "PASSWORD";

  description?: string | null;

  placeholder?: string | null;

  isRequired: boolean;

  orderIndex: string;
};

export default function FormPreviewPage() {

  const params = useParams();

  const formId = params.formId as string;

  const {
    form,
    isLoading,
    isFetching,
    error,
  } = useGetFormAndField(formId);

  const {
    submitFormAsync,
    status,
    isSuccess,
    error: submitError,
  } = useSubmitForm();

  const [responses, setResponses] =
    useState<Record<string, string>>({});

  const [password, setPassword] =
    useState("");

  const [validationError, setValidationError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    fieldId: string,
    value: string
  ) => {

    setResponses((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async () => {

    if (!form) return;

    setValidationError("");

    // Required field validation
    for (const field of form.fields) {

      if (
        field.isRequired &&
        !responses[field.fieldId]
      ) {
        setValidationError(
          `${field.label} is required`
        );

        return;
      }
    }

    try {

      setIsSubmitting(true);

      await submitFormAsync({

        formId,

        responses,

        password,

      });

    } catch (err) {

      console.error(err);

    } finally {

      setIsSubmitting(false);
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">

        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm border border-zinc-200">

          <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />

          <p className="text-sm font-medium text-zinc-700">
            Loading form...
          </p>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">

        <div className="w-full max-w-md rounded-3xl bg-white border border-red-200 p-6 shadow-sm">

          <div className="flex items-center gap-3 text-red-500">

            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">
              Failed to load form
            </h2>

          </div>

          <p className="mt-3 text-sm text-zinc-600">
            {error.message}
          </p>

        </div>

      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center">

        <div className="rounded-3xl bg-white border border-zinc-200 px-6 py-5 shadow-sm">

          <p className="text-zinc-700 font-medium">
            Form not found
          </p>

        </div>

      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">

        <div className="w-full max-w-md rounded-3xl bg-white border border-zinc-200 p-8 shadow-sm text-center">

          <div className="flex justify-center">

            <CheckCircle2 className="h-14 w-14 text-green-500" />

          </div>

          <h2 className="mt-5 text-2xl font-bold text-zinc-900">
            Submission Successful
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Your form response has been submitted successfully.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4">

      <div className="mx-auto w-full max-w-3xl">

        {/* Header */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {form.title}
          </h1>

          {form.description && (
            <p className="mt-3 text-zinc-600 leading-relaxed">
              {form.description}
            </p>
          )}

        </div>

        {/* Form */}
        <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">

          {/* Password */}
          {form.isPasswordProtected && (

            <div className="mb-8">

              <label className="block text-sm font-semibold text-zinc-800 mb-2">
                Form Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter form password"
                className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
              />

            </div>
          )}

          {/* Fields */}
          <div className="space-y-6">

            {form.fields.map((field) => (

              <div
                key={field.fieldId}
                className="space-y-2"
              >

                <label className="block text-sm font-semibold text-zinc-800">

                  {field.label}

                  {field.isRequired && (
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  )}

                </label>

                {field.description && (
                  <p className="text-sm text-zinc-500">
                    {field.description}
                  </p>
                )}

                {renderField(
                  field,
                  responses[field.fieldId] || "",
                  handleChange
                )}

              </div>
            ))}

          </div>

          {/* Validation Error */}
          {validationError && (

            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              {validationError}

            </div>
          )}

          {/* Submit Error */}
          {submitError && (

            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

              {submitError.message}

            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >

            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Form"
            )}

          </button>

        </div>

      </div>

    </div>
  );
}

function renderField(
  field: Field,
  value: string,
  onChange: (
    fieldId: string,
    value: string
  ) => void
) {

  const commonClass =
    "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900";

  switch (field.type) {

    case "TEXT":
      return (
        <input
          type="text"
          value={value}
          placeholder={field.placeholder || ""}
          onChange={(e) =>
            onChange(
              field.fieldId,
              e.target.value
            )
          }
          className={commonClass}
        />
      );

    case "EMAIL":
      return (
        <input
          type="email"
          value={value}
          placeholder={field.placeholder || ""}
          onChange={(e) =>
            onChange(
              field.fieldId,
              e.target.value
            )
          }
          className={commonClass}
        />
      );

    case "NUMBER":
      return (
        <input
          type="number"
          value={value}
          placeholder={field.placeholder || ""}
          onChange={(e) =>
            onChange(
              field.fieldId,
              e.target.value
            )
          }
          className={commonClass}
        />
      );

    case "PASSWORD":
      return (
        <input
          type="password"
          value={value}
          placeholder={field.placeholder || ""}
          onChange={(e) =>
            onChange(
              field.fieldId,
              e.target.value
            )
          }
          className={commonClass}
        />
      );

    case "YES_NO":
      return (
        <div className="flex items-center gap-6 pt-2">

          <label className="flex items-center gap-2 text-sm text-zinc-700">

            <input
              type="radio"
              name={field.fieldId}
              checked={value === "YES"}
              onChange={() =>
                onChange(
                  field.fieldId,
                  "YES"
                )
              }
            />

            Yes

          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-700">

            <input
              type="radio"
              name={field.fieldId}
              checked={value === "NO"}
              onChange={() =>
                onChange(
                  field.fieldId,
                  "NO"
                )
              }
            />

            No

          </label>

        </div>
      );

    default:
      return null;
  }
}