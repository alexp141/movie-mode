import { useQuery } from "@tanstack/react-query";
import { getReviews } from "./supabaseApi";
import { useSearchParams } from "react-router-dom";

function getFilterValue(filter) {
  if (!filter) {
    return "all";
  }

  switch (filter) {
    case "all":
      return "all";
    case "mixed-feelings":
      return "Mixed Feelings";
    case "recommended":
      return "Yes";
    case "not-recommended":
      return "No";

    default:
      throw new Error("Error picking filter value");
  }
}

export default function useReviews() {
  const [searchParams, setSearchParams] = useSearchParams();

  //Check for Filters
  const filter = searchParams.get("reviewFilter");
  const filterValue = getFilterValue(filter);

  const pageNumber = searchParams.get("page") ?? 1;

  const {
    data: { data: reviews, count } = {},
    fetchStatus,
    error,
  } = useQuery({
    queryKey: ["all reviews", filterValue, pageNumber],
    queryFn: () => getReviews({ filterValue, pageNumber }),
  });

  return { reviews, fetchStatus, error, count };
}
