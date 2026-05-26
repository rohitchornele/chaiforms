"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import {
  Loader2,
  AlertCircle,
  Inbox,
  ArrowLeft,
} from "lucide-react";

import {
  useGetFormAndField,
  useGetFormSubmissions,
} from "~/hooks/api/form";

export default function FormSubmissionsPage() {

  const params = useParams();

  const formId = params.id as string;

  const {
    submissions,
    isLoading: submissionsLoading,
    isFetching: submissionsFetching,
    error: submissionsError,
  } = useGetFormSubmissions(formId);

  const {
    form,
    isLoading: formLoading,
    isFetching: formFetching,
    error: formError,
  } = useGetFormAndField(formId);

  const isLoading =
    submissionsLoading ||
    submissionsFetching ||
    formLoading ||
    formFetching;

  const error =
    submissionsError ||
    formError;

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">

          <Loader2 className="h-5 w-5 animate-spin text-zinc-700" />

          <p className="text-sm font-medium text-zinc-700">
            Loading submissions...
          </p>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">

        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 text-red-500">

            <AlertCircle className="h-6 w-6" />

            <h2 className="text-lg font-semibold">
              Failed to load submissions
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
    return null;
  }

  const fields = form.fields;

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <Link
              href="/dashboard/forms"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >

              <ArrowLeft className="h-4 w-4" />

              Back to forms

            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              {form.title} Submissions
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              View and manage all submitted responses
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">

            <p className="text-sm text-zinc-500">
              Total Submissions
            </p>

            <h2 className="text-2xl font-bold text-zinc-900">
              {submissions?.length || 0}
            </h2>

          </div>

        </div>

        {/* Empty State */}
        {!submissions || submissions.length === 0 ? (

          <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">

            <Inbox className="h-16 w-16 text-zinc-300" />

            <h2 className="mt-5 text-2xl font-semibold text-zinc-900">
              No submissions yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
              Once users start submitting this form,
              all responses will appear here.
            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="min-w-full divide-y divide-zinc-200">

                <thead className="bg-zinc-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      #
                    </th>

                    {fields.map((field) => (

                      <th
                        key={field.fieldId}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 whitespace-nowrap"
                      >

                        {field.label}

                      </th>
                    ))}

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 whitespace-nowrap">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 whitespace-nowrap">
                      Submitted At
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-zinc-100 bg-white">

                  {submissions.map(
                    (
                      submission,
                      index
                    ) => (

                      <tr
                        key={submission.submissionId}
                        className="transition hover:bg-zinc-50"
                      >

                        <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-zinc-700">

                          {index + 1}

                        </td>

                        {fields.map((field) => {

                          const value =
                            submission.responses[
                              field.fieldId
                            ];

                          return (

                            <td
                              key={field.fieldId}
                              className="px-6 py-5 text-sm text-zinc-700 whitespace-nowrap"
                            >

                              <div className="max-w-[250px] truncate">

                                {value || "-"}

                              </div>

                            </td>
                          );
                        })}

                        <td className="whitespace-nowrap px-6 py-5">

                          <StatusBadge
                            status={submission.status}
                          />

                        </td>

                        <td className="whitespace-nowrap px-6 py-5 text-sm text-zinc-600">

                          {new Date(
                            submission.createdAt
                          ).toLocaleString()}

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

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
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >

      {status}

    </span>
  );
}