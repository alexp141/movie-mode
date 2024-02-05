import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "./supabaseApi";

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isLoading } = useMutation({
    mutationFn: (imdbID) => deleteReview(imdbID),
    onSuccess: (imdbID) => {
      console.log(`successfully deleted ${imdbID}`);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate, isPending, isLoading };
}
