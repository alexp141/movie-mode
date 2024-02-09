import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeReview } from "./supabaseApi";
import { toast } from "react-toastify";

export default function useLikeReview() {
  const queryClient = useQueryClient();
  const {
    mutate: likeReviewPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ review_post_id, isLiked }) =>
      likeReview({ review_post_id, isLiked }),
    onSuccess: (post_id) => {
      console.log("REVIEW POST ID", post_id);
      queryClient.invalidateQueries({
        queryKey: ["check-if-liked", post_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["check-if-disliked", post_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-review-likes", post_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-review-dislikes", post_id],
      });
      toast.success("succesfully liked post");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { likeReviewPost, isPending, error };
}
