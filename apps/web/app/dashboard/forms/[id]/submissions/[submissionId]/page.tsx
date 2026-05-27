"use client";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import {
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  useGetFormAndField,
  useGetFormSubmissions,
} from "~/hooks/api/form";

export default function SubmissionDetailPage() {

  const params =
    useParams();

  const formId =
    params.id as string;

  const submissionId =
    params.submissionId as string;

  const {
    form,
    isLoading:
      formLoading,
    error:
      formError,
  } =
    useGetFormAndField(
      formId
    );

  const {
    submissions,
    isLoading:
      submissionsLoading,
    error:
      submissionsError,
  } =
    useGetFormSubmissions(
      formId
    );

  const isLoading =

    formLoading ||

    submissionsLoading;

  const error =

    formError ||

    submissionsError;

  if (isLoading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-zinc-100">

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">

          <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />

          <p className="text-sm font-medium text-zinc-700">

            Loading submission...

          </p>

        </div>

      </div>
    );
  }

  if (
    error ||
    !form ||
    !submissions
  ) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">

        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 text-red-600">

            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">

              {
                error?.message ||
                "Submission not found"
              }

            </h2>

          </div>

        </div>

      </div>
    );
  }

  const submission =
    submissions.find(
      (item) =>
        item.submissionId ===
        submissionId
    );

  if (!submission) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">

        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 text-red-600">

            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">

              Submission not found

            </h2>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <Link
              href={`/dashboard/forms/${formId}/submissions`}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >

              <ArrowLeft className="h-4 w-4" />

              Back to submissions

            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">

              Submission Details

            </h1>

            <p className="mt-2 text-sm text-zinc-500">

              Submitted on{" "}

              {new Date(
                submission.createdAt
              ).toLocaleString()}

            </p>

          </div>

          <StatusBadge
            status={
              submission.status
            }
          />

        </div>

        {/* Answers */}
        <div className="space-y-5">

          {form.fields.map(
            (field) => {

              const value =

                submission.responses[
                  field.fieldId
                ];

              return (

                <div
                  key={
                    field.fieldId
                  }
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >

                  <div className="mb-3">

                    <h2 className="text-lg font-semibold text-zinc-900">

                      {field.label}

                    </h2>

                    {field.description && (

                      <p className="mt-1 text-sm text-zinc-500">

                        {
                          field.description
                        }

                      </p>
                    )}

                  </div>

                  <div className="rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700">

                    {value || "-"}

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

type StatusProps = {

  status:

    | "PENDING"

    | "COMPLETED"

    | "REJECTED"

    | "SPAM";
};

function StatusBadge({

  status,

}: StatusProps) {

  const styles = {

    PENDING:
      "bg-yellow-100 text-yellow-700 border-yellow-200",

    COMPLETED:
      "bg-green-100 text-green-700 border-green-200",

    REJECTED:
      "bg-red-100 text-red-700 border-red-200",

    SPAM:
      "bg-zinc-200 text-zinc-700 border-zinc-300",
  };

  return (

    <span
      className={`inline-flex h-fit rounded-full border px-4 py-2 text-sm font-semibold ${styles[status]}`}
    >

      {status}

    </span>
  );
}