import EmptyFormsState from "./EmptyFormsState";
import FormCard from "./FormCard";
import FormSkeletonCard from "./FormSkeletonCard";

import type { Form } from "~/types/form";

type Props = {
  forms: Form[];

  isLoading: boolean;

  error: unknown;

  onCreate: () => void;
};

export default function FormGrid({
  forms,
  isLoading,
  error,
  onCreate,
}: Props) {
  if (error) {
    return (
      <div className="px-6 text-red-500">
        Failed to load forms
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 xl:grid-cols-3 lg:px-6">
        {Array.from({ length: 6 }).map(
          (_, i) => (
            <FormSkeletonCard key={i} />
          )
        )}
      </div>
    );
  }

  if (!forms || forms.length === 0) {
    return (
      <div className="px-4 lg:px-6">
        <EmptyFormsState
          onCreate={onCreate}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 xl:grid-cols-3 lg:px-6">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
        />
      ))}
    </div>
  );
}