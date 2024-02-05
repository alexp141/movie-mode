import { useQuery } from "@tanstack/react-query";
import { getPoster } from "./fanartApi";

export default function usePoster(title, imdbId) {
  const {
    data: posterImg,
    fetchStatus,
    error,
  } = useQuery({
    queryKey: ["poster", title, imdbId],
    queryFn: () => getPoster({ title, imdbId }),
  });

  return { posterImg, fetchStatus, error };
}
