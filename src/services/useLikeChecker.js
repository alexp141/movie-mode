import { useQuery } from "@tanstack/react-query";
import { checkIfLiked } from "./supabaseApi";

export default function useLikeChecker(post_id) {
  const {
    data: isLiked,
    fetchStatus,
    error,
  } = useQuery({
    queryKey: ["check-if-liked", post_id],
    queryFn: () => checkIfLiked({ post_id }),
  });

  return { isLiked, fetchStatus, error };
}
