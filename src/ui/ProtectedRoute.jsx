import { useEffect } from "react";
import useUser from "../services/useUser";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { user, isLoadingUser, isAuthenticated, fetchStatus } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (fetchStatus !== "fetching" && !isLoadingUser && !isAuthenticated) {
        console.log(isAuthenticated, isLoadingUser, fetchStatus);
        navigate("/login");
      }
      console.log("user in protected route", user);
    },
    [isAuthenticated, isLoadingUser, navigate, fetchStatus, user]
  );

  // 3. While loading, show a spinner
  if (isLoadingUser) return <h1>loading user data</h1>;

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}
