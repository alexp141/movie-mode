import { useQuery } from "@tanstack/react-query";
import { getNumLikesForReviewPost } from "./supabaseApi";

export default function useReviewLikesCount(review_post_id) {
  const {
    data: likeCount,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["get-review-likes", review_post_id],
    queryFn: () => getNumLikesForReviewPost({ review_post_id }),
  });
  return { likeCount, isFetching, error };
}
