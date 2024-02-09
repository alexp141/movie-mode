import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "./supabaseApi";
import { toast } from "react-toastify";

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isLoading } = useMutation({
    mutationFn: (imdbID) => deleteReview(imdbID),
    onSuccess: (imdbID) => {
      console.log(`successfully deleted ${imdbID}`);
      queryClient.invalidateQueries({
        queryKey: ["all reviews"],
      });
      //TODO: query key needs to be ["review, title]
      queryClient.invalidateQueries({
        queryKey: ["review"],
      });
      toast.success("succesfully deleted review");
    },
    onError: (error) => {
      console.error(error);
      toast.success("something went wrong");
    },
  });

  return { mutate, isPending, isLoading };
}
