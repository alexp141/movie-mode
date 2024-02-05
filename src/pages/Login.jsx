import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { signInWithEmail } from "../services/Authapi";
import { useNavigate } from "react-router-dom";
import { Form, FormContainer, FormInputField, StyledLink } from "./Signup";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";

export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    isSubmitting,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signInWithEmail({ email, password }),
    onSuccess: (data) => {
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    //handle login

    const { email, password } = data;
    mutate({ email, password });
  }

  function onSubmitError(error) {
    console.log(error);
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <h1>Login</h1>
        <div>
          <FormInputField>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: "this field is required" })}
            />
            {errors?.email?.message && (
              <ErrorMessage msg={errors.email.message} />
            )}
          </FormInputField>
          <FormInputField>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: "this field is required" })}
            />
            {errors?.password?.message && (
              <ErrorMessage msg={errors.password.message} />
            )}
          </FormInputField>
        </div>
        <Button size="large" variation="primary" type="submit">
          Login
        </Button>
        <p>
          Not a member? <StyledLink to="/signup">signup</StyledLink>
        </p>
      </Form>
    </FormContainer>
  );
}
