import { useQuery } from "@tanstack/react-query";
import { getWatchList } from "./supabaseApi";

export default function useWatchList() {
  const { data, isLoading, fetchStatus } = useQuery({
    queryKey: ["watch list"],
    queryFn: () => getWatchList(),
  });

  return { data, isLoading, fetchStatus };
}
