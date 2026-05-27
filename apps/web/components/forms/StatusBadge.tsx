import type {
  FormStatus,
} from "~/types/form";

type Props = {
  status?: FormStatus;
};

export default function StatusBadge({
  status = "DRAFT",
}: Props) {
  const styles: Record<
    FormStatus,
    string
  > = {
    PUBLISHED:
      "bg-emerald-50 text-emerald-700",

    DRAFT:
      "bg-amber-50 text-amber-700",

    ARCHIVE:
      "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}