import { useQuery } from "@tanstack/react-query";
import { getQueryByTitle } from "./omdbApi";

export default function useQueryDetails(title, imdbId) {
  const {
    isLoading: isLoadingQuery,
    data,
    error,
    fetchStatus,
  } = useQuery({
    queryKey: ["query details", title, imdbId], //if we set it only to searchParams, it will not work since the reference to searchParams is not getting updated
    queryFn: () => getQueryByTitle({ title, imdbId }),
  });

  return { isLoadingQuery, data, error, fetchStatus };
}
