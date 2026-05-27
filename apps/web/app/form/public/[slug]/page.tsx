"use client";

import {
  useParams,
} from "next/navigation";

import {
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  useGetPublicForm,
} from "~/hooks/api/form";

export default function PublicFormPage() {

  const params =
    useParams();

  const slug = params.slug as string;

  const {

    form,

    isLoading,

    error,

  } =
    useGetPublicForm(
      slug
    );

  if (isLoading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-zinc-100">

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">

          <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />

          <p className="text-sm font-medium text-zinc-700">

            Loading form...

          </p>

        </div>

      </div>
    );
  }

  if (error || !form) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">

        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 text-red-600">

            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">

              {
                error?.message ||
                "Form not found"
              }

            </h2>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-zinc-100 p-4 md:p-10">

      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-zinc-900">

            {form.title}

          </h1>

          {form.description && (

            <p className="mt-3 text-zinc-600">

              {form.description}

            </p>
          )}

        </div>

        {/* Fields */}
        <div className="space-y-6">

          {form.fields.map(
            (field) => (

              <div
                key={
                  field.fieldId
                }
              >

                <label className="mb-2 block text-sm font-medium text-zinc-800">

                  {field.label}

                  {field.isRequired && (

                    <span className="ml-1 text-red-500">

                      *

                    </span>
                  )}

                </label>

                {field.description && (

                  <p className="mb-2 text-sm text-zinc-500">

                    {
                      field.description
                    }

                  </p>
                )}

                <input
                  type="text"
                  placeholder={
                    field.placeholder ||
                    ""
                  }
                  className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-900"
                />

              </div>
            )
          )}

        </div>

        {/* Submit */}
        <button className="mt-8 w-full rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black">

          Submit Form

        </button>

      </div>

    </div>
  );
}