import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/Authapi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoutButton = styled.button`
  color: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--color-purple-light-20);
  border: 1px solid var(--color-purple-light-20);
  border-radius: 3px;
`;

export default function Logout() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      console.log("logout successful");
      navigate("/login");
    },
    onError: () => {
      console.error("error logging out");
    },
  });
  return (
    <LogoutButton disabled={isLoading} onClick={mutate}>
      Logout
    </LogoutButton>
  );
}
