import { useQuery } from "@tanstack/react-query";
import { checkIfDisikedReview } from "./supabaseApi";

export default function useDislikeChecker(post_id) {
  const {
    data: isDisliked,
    fetchStatus,
    error,
  } = useQuery({
    queryKey: ["check-if-disliked", post_id],
    queryFn: () => checkIfDisikedReview({ post_id }),
  });

  return { isDisliked, fetchStatus, error };
}
