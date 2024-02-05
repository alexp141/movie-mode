import { useQuery } from "@tanstack/react-query";
import { getNumDislikesForReviewPost } from "./supabaseApi";

export default function useReviewDislikesCount(review_post_id) {
  const {
    data: dislikeCount,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["get-review-dislikes", review_post_id],
    queryFn: () => getNumDislikesForReviewPost({ review_post_id }),
  });
  return { dislikeCount, isFetching, error };
}
