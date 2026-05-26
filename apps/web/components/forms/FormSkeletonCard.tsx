export default function FormSkeletonCard() {
  return (
    <div className="animate-pulse space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded-full bg-gray-200" />

        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>

      <div className="h-5 w-3/5 rounded bg-gray-200" />

      <div className="h-4 w-4/5 rounded bg-gray-100" />

      <div className="h-4 w-2/5 rounded bg-gray-100" />
    </div>
  );
}