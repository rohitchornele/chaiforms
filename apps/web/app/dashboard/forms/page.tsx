"use client";

import { useMemo, useState } from "react";

import { useListForm } from "~/hooks/api/form";

import type { Form } from "~/types/form";

import FormsToolbar from "~/components/forms/FormsToolbar";
import FormGrid from "~/components/forms/FormGrid";
import CreateFormModal from "~/components/forms/CreateFormModal";

export default function FormsPage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "published" | "draft" | "archived"
  >("all");

  const { forms, isLoading, isFetching, error } =
    useListForm();

  const filteredForms = useMemo(() => {
    return (forms as Form[])?.filter((form) => {
      const matchesSearch =
        form.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        form.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        form.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [forms, search, filter]);

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="flex flex-col gap-6 py-4 md:py-6">
          <FormsToolbar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            count={filteredForms?.length || 0}
            onCreate={() => setOpen(true)}
            isFetching={isFetching}
            isLoading={isLoading}
          />

          <FormGrid
            forms={filteredForms || []}
            isLoading={isLoading}
            error={error}
            onCreate={() => setOpen(true)}
          />
        </div>
      </div>

      <CreateFormModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}