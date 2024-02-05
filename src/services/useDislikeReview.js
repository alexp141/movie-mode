import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikeReview } from "./supabaseApi";
import { toast } from "react-toastify";

export default function useDislikeReview() {
  const queryClient = useQueryClient();
  const {
    mutate: dislikeReviewPost,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ review_post_id, isDisliked }) =>
      dislikeReview({ review_post_id, isDisliked }),
    onSuccess: (post_id) => {
      console.log("REVIEW POST ID", post_id);
      queryClient.invalidateQueries({
        queryKey: ["check-if-liked", post_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["check-if-disliked", post_id],
      });
      toast.success("succesfully disliked post");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { dislikeReviewPost, isPending, error };
}
