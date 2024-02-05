import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import useSignup from "../services/useSignup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";

const FormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-purple-dark-80);
`;

const Form = styled.form`
  padding: 2rem 3rem;
  flex: 0 1 48rem;
  background-color: var(--color-purple-dark-70);
  color: var(--color-white);
  border: 2px solid var(--color-white);
  border-radius: var(--border-radius-md);

  & h1 {
    margin-bottom: 2rem;
  }

  & > div {
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  & button {
    margin-bottom: 0.8rem;
  }
`;

const FormInputField = styled.div`
  font-size: large;

  & p,
  & label {
    font-weight: 500;
  }

  & input {
    color: inherit;
    width: 100%;
    border: 1px solid var(--color-purple);
    border-radius: var(--border-radius-lg);
    padding: 0.8rem 1.2rem;
    background-color: var(--color-form-input);
    font-size: 1.8rem;
    margin-top: 0.5rem;
  }

  & input:focus {
    outline: 2px solid var(--color-purple);
    outline-offset: -1px;
  }
`;

const StyledLink = styled(Link)`
  padding: 0 !important;

  &:link,
  &:visited {
    color: var(--color-purple-light-80);
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1.2rem 2.4rem;
    transition: all 0.2s;
  }

  &:hover,
  &:active {
    color: var(--color-purple);
    text-decoration: underline;
  }
`;

export default function Signup() {
  const { signupUser, isPending, error } = useSignup();
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const USERNAME_MAX_LENGTH = 12;
  const PASSWORD_MIN_LENGTH = 6;

  function onSubmit({ username, email, password }) {
    signupUser({ username, email, password });
  }

  function onSubmitError(error) {
    console.error(error);
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
        <h1>Register Now</h1>
        <div>
          <FormInputField>
            <p>Username</p>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              {...register("username", {
                required: "This field is required",
                maxLength: {
                  value: USERNAME_MAX_LENGTH,
                  message: `Username can be max of ${USERNAME_MAX_LENGTH} characters`,
                },
              })}
            />
            {errors?.username?.message && (
              <ErrorMessage msg={errors.username.message} />
            )}
          </FormInputField>
          <FormInputField>
            <p>Email</p>
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            {errors?.email?.message && (
              <ErrorMessage msg={errors.email.message} />
            )}
          </FormInputField>
          <FormInputField>
            <p>Password</p>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: PASSWORD_MIN_LENGTH,
                  message: `Length of password must be at least ${PASSWORD_MIN_LENGTH} characters`,
                },
              })}
            />
            {errors?.password?.message && (
              <ErrorMessage msg={errors.password.message} />
            )}
          </FormInputField>
        </div>
        <Button size="large" variation="primary" type="submit">
          Signup
        </Button>
        <p>
          Already a member? <StyledLink to="/login">Login</StyledLink>
        </p>
      </Form>
    </FormContainer>
  );
}

export { FormContainer, Form, FormInputField, StyledLink };
