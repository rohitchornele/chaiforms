import {
  FileText,
  Plus,
} from "lucide-react";

type Props = {
  onCreate: () => void;
};

export default function EmptyFormsState({
  onCreate,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-24 text-center">
      <div className="rounded-3xl bg-gray-100 p-6">
        <FileText
          size={42}
          className="text-gray-400"
        />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        No forms yet
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Create your first form.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white"
      >
        <Plus size={16} />
        Create Form
      </button>
    </div>
  );
}