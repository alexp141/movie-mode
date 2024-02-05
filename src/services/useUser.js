import { useQuery } from "@tanstack/react-query";
import { getUser } from "./Authapi";

export default function useUser() {
  const {
    data: user,
    isLoading: isLoadingUser,
    fetchStatus,
  } = useQuery({
    queryKey: ["get user"],
    queryFn: getUser,
  });

  return {
    user,
    isLoadingUser,
    fetchStatus,
    isAuthenticated: user?.role === "authenticated" ? true : false,
  };
}
