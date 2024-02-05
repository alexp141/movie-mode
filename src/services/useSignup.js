import { useMutation } from "@tanstack/react-query";
import { signupUser as signupUserApi } from "./Authapi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSignup() {
  const navigate = useNavigate();

  const {
    mutate: signupUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ username, email, password }) => {
      return signupUserApi({ username, email, password });
    },
    onSuccess: () => {
      console.log("signup success");
      toast.success("Registration successful");
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Something went wrong");
      console.log("signup failure");
    },
  });

  return { signupUser, isPending, error };
}
