import { useQuery } from "@tanstack/react-query";
import { getReview } from "./supabaseApi";

export default function useReview(title) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["review", title],
    queryFn: () => getReview(title),
  });

  return { isLoading, data, error };
}
