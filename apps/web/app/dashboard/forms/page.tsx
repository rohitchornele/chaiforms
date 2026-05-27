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

  const [filter, setFilter] = useState<"all" | "published" | "draft" | "archived">("all");

  const { forms, isLoading, isFetching, error } = useListForm();

  const filteredForms = useMemo(() => {
    return (forms as Form[])?.filter((form) => {
      const title = form.title?.toLowerCase() || "";

      const description = form.description?.toLowerCase() || "";

      const status = form.status?.toLowerCase() || "";

      const matchesSearch =
        title.includes(search.toLowerCase()) || description.includes(search.toLowerCase());

      const matchesFilter = filter === "all" || status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [forms, search, filter]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-6">
        {/* Toolbar */}
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

        {/* Grid */}
        <div className="min-h-0 flex-1">
          <FormGrid
            forms={filteredForms || []}
            isLoading={isLoading}
            error={error}
            onCreate={() => setOpen(true)}
          />
        </div>
      </div>

      <CreateFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
