// "use client";

import {
  Plus,
  Search,
  Sparkles,
  Loader2,
} from "lucide-react";

type FilterType =
  | "all"
  | "published"
  | "draft"
  | "archive";

type Props = {
  search: string;

  setSearch: (
    value: string,
  ) => void;

  filter: FilterType;

  setFilter: (
    value: FilterType,
  ) => void;

  count: number;

  onCreate: () => void;

  isFetching: boolean;

  isLoading: boolean;
};

const FILTERS: FilterType[] =
  [
    "all",
    "published",
    "draft",
    "archive",
  ];

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
    <div className="flex flex-col gap-6">

      {/* TOP */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9732B]/20 bg-[#C9732B]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#F3EBDD]">

            <Sparkles className="h-3.5 w-3.5" />

            Form Control Center

          </div>

          <div className="mt-5 flex items-center gap-3">

            <h2 className="text-4xl font-black tracking-tight text-white">
              Your Forms
            </h2>

            {isFetching &&
              !isLoading && (

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04]">

                  <Loader2 className="h-4 w-4 animate-spin text-white/60" />

                </div>

              )}

          </div>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
            Manage your immersive forms,
            monitor engagement, and
            create cinematic experiences
            for your audience.
          </p>

        </div>

        {/* RIGHT */}
        <button
          onClick={onCreate}
          className="
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-[#C9732B]
            to-[#B56A3C]
            px-6
            py-4
            text-sm
            font-medium
            text-white
            shadow-[0_10px_40px_rgba(201,115,43,0.25)]
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-[0_10px_60px_rgba(201,115,43,0.35)]
          "
        >

          <Plus className="h-5 w-5" />

          <span>
            Create Form
          </span>

        </button>

      </div>

      {/* CONTROLS */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

            <input
              type="text"
              placeholder="Search forms..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value,
                )
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                pl-12
                pr-4
                text-sm
                text-white
                outline-none
                backdrop-blur-xl
                transition-all
                placeholder:text-white/30
                focus:border-[#C9732B]/40
                focus:ring-4
                focus:ring-[#C9732B]/10
              "
            />

          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">

            {FILTERS.map(
              (item) => {

                const active =
                  filter === item;

                return (
                  <button
                    key={item}
                    onClick={() =>
                      setFilter(
                        item,
                      )
                    }
                    className={`
                      rounded-2xl
                      border
                      px-5
                      py-3
                      text-sm
                      font-medium
                      capitalize
                      transition-all
                      duration-300
                      ${
                        active
                          ? `
                            border-[#C9732B]/20
                            bg-[#C9732B]/15
                            text-[#F3EBDD]
                            shadow-[0_0_30px_rgba(201,115,43,0.12)]
                          `
                          : `
                            border-white/10
                            bg-white/[0.03]
                            text-white/50
                            hover:bg-white/[0.06]
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              },
            )}

          </div>

        </div>

        {/* RIGHT */}
        {!isLoading && (

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl">

            <div className="h-2.5 w-2.5 rounded-full bg-[#C9732B]" />

            <span className="text-sm text-white/60">

              <span className="font-semibold text-white">
                {count}
              </span>{" "}

              forms available

            </span>

          </div>

        )}

      </div>

    </div>
  );
}