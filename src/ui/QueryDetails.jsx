import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { getQueryByTitle } from "../services/omdbApi";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "./Button";
import Modal, { ModalContext } from "./Modal";
import { useContext } from "react";
import CreateReviewForm from "./createReviewForm";
import useReview from "../services/useReview";
import LogoImdb from "../assets/LogoImdb";
import LogoMetacritic from "../assets/LogoMetacritic";
import LogoRottenTomato from "../assets/LogoRottenTomato";
import useDeleteReview from "../services/useDeleteReview";
import ButtonPicker from "./ButtonPicker";
import Spinner from "./Spinner";
import useQueryDetails from "../services/useQueryDetails";

const StyledQueryDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const HeaderPoster = styled.img`
  width: 100%;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const HeaderRow = styled.div`
  display: flex;
  gap: 2rem;

  & h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  & p {
    font-size: 2.5rem;
  }
`;

const Ratings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & svg {
    width: 5rem;
    height: 5rem;
  }

  & h2 {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  font-size: 2rem;
  margin: 2rem 0;
`;

const ReviewButton = styled(Button)`
  margin-top: auto;
`;
export default function QueryDetails() {
  const { title } = useParams();
  const { open, setOpen } = useContext(ModalContext);
  const [searchParams] = useSearchParams();
  const imdbId = searchParams.get("imdbId");

  const {
    isLoading: isLoadingQuery,
    data,
    error,
    fetchStatus,
  } = useQueryDetails(title, imdbId);
  const { data: review, isLoading: isLoadingReview } = useReview(
    data?.Title || ""
  ); //gets review of media if the user has already reviewed it

  const {
    mutate: deleteReview,
    isPending,
    isLoading,
  } = useDeleteReview(data?.imdbID);

  if (isLoadingQuery || isLoadingReview || fetchStatus === "fetching") {
    return <Spinner />;
  }

  const {
    Type: type,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Rated: rated,
    Ratings: ratings,
    Plot: plot,
    Poster: poster,
    Awards: awards,
    Actors: actors,
    Director: director,
    imdbID,
    Response: response,
  } = data;

  if (response === "False") {
    return <p>No data found!!</p>;
  }

  return (
    <StyledQueryDetails>
      <Header>
        <HeaderPoster src={poster} alt={`poster of ${title}`} />
        <HeaderRight>
          <HeaderRow>
            <h1>
              {title} ({type})
            </h1>
          </HeaderRow>
          <HeaderRow>
            <p>{released} - </p>
            <p>{runtime}</p>
          </HeaderRow>
          <HeaderRow>
            <p>{genre}</p>
          </HeaderRow>
          <HeaderRow>
            <p>{rated}</p>
          </HeaderRow>

          {!review ? (
            <ReviewButton
              size="large"
              variation="primary"
              onClick={() => {
                setOpen("review-form");
              }}
            >
              Add to List
            </ReviewButton>
          ) : (
            <ReviewButton
              size="large"
              variation="danger"
              onClick={() => {
                //delete entry
                deleteReview(imdbID);
              }}
            >
              Remove From List
            </ReviewButton>
          )}
        </HeaderRight>
      </Header>
      <Section>
        <p>{plot}</p>
      </Section>
      <Section>
        <p>{awards}</p>
      </Section>
      <Section>
        <p>{`Starring: ${actors}`}</p>
      </Section>
      <Section>
        <p>{`Directed by: ${director}`}</p>
      </Section>
      <Section>
        <Ratings>
          {ratings && ratings[0] && (
            <Rating>
              <LogoImdb />
              <p>{`${ratings[0].Source}: ${ratings[0].Value}`}</p>
            </Rating>
          )}
          {ratings && ratings[1] && (
            <Rating>
              <LogoMetacritic />
              <p>{`${ratings[1].Source}: ${ratings[1].Value}`}</p>
            </Rating>
          )}
          {ratings && ratings[2] && (
            <Rating>
              <LogoRottenTomato />
              <p>{`${ratings[2].Source}: ${ratings[2].Value}`}</p>
            </Rating>
          )}
        </Ratings>
      </Section>
      <Modal.Window windowName="review-form">
        <ButtonPicker>
          <CreateReviewForm queryDetails={{ title, poster, imdbID }} />
        </ButtonPicker>
      </Modal.Window>
      <Modal.Window windowName="test-form">
        <p>test</p>
      </Modal.Window>
    </StyledQueryDetails>
  );
}
