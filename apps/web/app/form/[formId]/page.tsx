"use client";

import { useParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { useGetFormAndField } from "~/hooks/api/form";


export default function FormPreviewPage() {
  const params = useParams();

  const formId = params.formId as string;

  const {
    form,
    isLoading,
    isFetching,
    error,
  } = useGetFormAndField(formId);

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

        {/* Fields */}
        <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.fieldId} className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-800">
                  {field.label}

                  {field.isRequired && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </label>

                {field.description && (
                  <p className="text-sm text-zinc-500">
                    {field.description}
                  </p>
                )}

                {renderField(field)}
              </div>
            ))}
          </div>

          <button
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
}

type Field = {
  fieldId: string;
  label: string;
  labelKey?: string;
  type: "TEXT" | "NUMBER" | "EMAIL" | "YES_NO" | "PASSWORD";
  description?: string | null;
  placeholder?: string | null;
  isRequired: boolean;
  orderIndex: string;
};

function renderField(field: Field) {
  const commonClass =
    "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900";

  switch (field.type) {
    case "TEXT":
      return (
        <input
          type="text"
          placeholder={field.placeholder || ""}
          className={commonClass}
        />
      );

    case "EMAIL":
      return (
        <input
          type="email"
          placeholder={field.placeholder || ""}
          className={commonClass}
        />
      );

    case "NUMBER":
      return (
        <input
          type="number"
          placeholder={field.placeholder || ""}
          className={commonClass}
        />
      );

    case "PASSWORD":
      return (
        <input
          type="password"
          placeholder={field.placeholder || ""}
          className={commonClass}
        />
      );

    case "YES_NO":
      return (
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="radio" name={field.fieldId} />
            Yes
          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="radio" name={field.fieldId} />
            No
          </label>
        </div>
      );

    default:
      return null;
  }
}