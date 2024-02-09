import { useForm } from "react-hook-form";
import styled from "styled-components";
import StarRating, { StarContext } from "./StarRating";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReview } from "../services/supabaseApi";
import { toast } from "react-toastify";
import ButtonPicker from "./ButtonPicker";

const StyledForm = styled.form`
  text-align: center;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & svg {
    font-size: 4rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  color: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: var(--color-purple-light-20);
  border: 1px solid var(--color-purple-light-20);
  border-radius: 3px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;

  & textarea {
    min-height: 30rem;
    border: 1px solid var(--color-purple-light-20);
    border-radius: 3px;
    background-color: var(--color-purple-light-90);
  }
`;

const RecommendationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export default function CreateReviewForm({
  queryDetails: { title, poster, imdbID },
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isLoading } = useMutation({
    mutationFn: ({ rating, review, would_recommend }) =>
      submitReview({ title, poster, imdbID, rating, review, would_recommend }),
    onSuccess: () => {
      toast.success("Review successfully submitted");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      rating: 0,
      review: "",
      recommended: "Yes",
    },
  });

  function onSubmit(data) {
    console.log(data);
    const { rating, review, recommended: would_recommend } = data;
    //Submit Data to Database
    mutate({ rating, review, would_recommend });
  }

  function onError(error) {
    console.error(error);
  }

  return (
    <>
      <Title>{title}</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
        <FormSection>
          <label htmlFor="rating">Your Rating</label>
          <input
            type="hidden"
            id="rating"
            name="rating"
            value={0}
            {...register("rating", {
              required: "this field is required",
              min: {
                value: 1,
                message: "your rating must be at least one star",
              },
              max: {
                value: 10,
                message: "your rating must be at most ten stars",
              },
            })}
          />
          {errors?.rating?.message}
          <StarRating ratingLength={10} setValue={setValue}></StarRating>
        </FormSection>
        <FormSection>
          <label htmlFor="recommended">
            Would you recommend this to a friend?
          </label>

          <RecommendationButtons>
            <ButtonPicker.Button setValue={setValue} recommended="Yes" id={1}>
              Yes
            </ButtonPicker.Button>
            <ButtonPicker.Button setValue={setValue} recommended="No" id={2}>
              No
            </ButtonPicker.Button>
            <ButtonPicker.Button
              setValue={setValue}
              recommended="Mixed Feelings"
              id={3}
            >
              Mixed Feelings
            </ButtonPicker.Button>
          </RecommendationButtons>
          <select
            hidden
            id="recommended"
            {...register("recommended", { required: "this field is required" })}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Mixed Feelings">N/A</option>
          </select>
          {errors?.recommended?.message}
        </FormSection>
        <FormSection>
          <label htmlFor="review">Your Review</label>
          <textarea
            id="review"
            rows="5"
            {...register("review", { required: "this field is required" })}
          />
          {errors?.review?.message}
        </FormSection>

        <SubmitButton>Submit</SubmitButton>
      </StyledForm>
    </>
  );
}
