import { Plus, Search } from "lucide-react";

type Props = {
  search: string;

  setSearch: (
    value: string
  ) => void;

  filter:
    | "all"
    | "published"
    | "draft"
    | "archived";

  setFilter: (
    value:
      | "all"
      | "published"
      | "draft"
      | "archived"
  ) => void;

  count: number;

  onCreate: () => void;

  isFetching: boolean;

  isLoading: boolean;
};

export default function FormsToolbar({
  search,
  setSearch,
  filter,
  setFilter,
  count,
  onCreate,
  isFetching,
  isLoading,
}: Props) {
  return (
    <>
      <div className="sticky top-0 z-10 flex flex-col gap-4 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between lg:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Forms

            {isFetching && !isLoading && (
              <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-black align-middle" />
            )}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and share all your forms.
          </p>
        </div>

        <button
          onClick={onCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-gray-800"
        >
          <Plus size={16} />
          Create Form
        </button>
      </div>

      <div className="flex flex-col gap-3 px-4 md:flex-row md:items-center lg:px-6">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search forms..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          {[
            "all",
            "published",
            "draft",
            "archived",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(
                  item as
                    | "all"
                    | "published"
                    | "draft"
                    | "archived"
                )
              }
              className={`rounded-lg px-4 py-2 text-xs font-medium capitalize transition-all ${
                filter === item
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {!isLoading && (
          <span className="text-xs text-gray-400 md:ml-auto">
            {count} forms
          </span>
        )}
      </div>
    </>
  );
}