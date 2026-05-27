import { trpc } from "~/trpc/client";


export const useDashboardOverview = () => {

  const {

    data: dashboard,

    error,

    isLoading,

    isFetching,

    isFetched,

    refetch,

    status,

  } = trpc.dashboard.getOverview
    .useQuery();

  return {

    dashboard,

    error,

    isLoading,

    isFetching,

    isFetched,

    refetch,

    status,
  };
};