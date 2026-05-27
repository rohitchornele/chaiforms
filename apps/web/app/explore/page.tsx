"use client";

import Link from "next/link";

import {
  Globe,
  Loader2,
  FileText,
  ArrowRight,
} from "lucide-react";

import {
  useListPublicForms,
} from "~/hooks/api/form";

export default function ExplorePage() {

  const {
    forms,
    isLoading,
  } =
    useListPublicForms(
      1,
      12
    );

  if (isLoading) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-zinc-100">

        <Loader2 className="h-6 w-6 animate-spin text-zinc-700" />

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-zinc-100">

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">

              <Globe className="h-4 w-4" />

              Public Community Forms

            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-zinc-900">

              Explore Public Forms

            </h1>

            <p className="mt-5 text-lg leading-relaxed text-zinc-600">

              Discover forms created by the community.
              Open, explore and submit responses instantly.

            </p>

          </div>

        </div>

      </section>

      {/* Forms */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {!forms ||
        forms.length === 0 ? (

          <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">

            <Globe className="h-16 w-16 text-zinc-300" />

            <h2 className="mt-5 text-2xl font-semibold text-zinc-900">

              No public forms yet

            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">

              Once creators publish public forms,
              they will appear here.

            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {forms.map(
              (form) => (

                <Link
                  key={form.id}
                  href={`/form/public/${form.slug}`}
                  target="_blank"
                  className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl"
                >

                  {/* Top */}
                  <div className="flex items-center justify-between">

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">

                      PUBLIC

                    </span>

                    <span className="text-xs text-zinc-500">

                      {new Date(
                        form.createdAt
                      ).toLocaleDateString()}

                    </span>

                  </div>

                  {/* Title */}
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900 transition group-hover:text-zinc-700">

                    {form.title}

                  </h2>

                  {/* Description */}
                  {form.description && (

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-600">

                      {form.description}

                    </p>
                  )}

                  {/* Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">

                    <div className="flex items-center gap-2 text-sm text-zinc-500">

                      <FileText className="h-4 w-4" />

                      {form.responseCount} responses

                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium text-zinc-700 transition group-hover:translate-x-1">

                      Open

                      <ArrowRight className="h-4 w-4" />

                    </div>

                  </div>

                </Link>
              )
            )}

          </div>
        )}

      </section>

    </div>
  );
}