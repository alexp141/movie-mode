import styled from "styled-components";
import ReviewItem from "../ui/ReviewItem";
import useReviews from "../services/useReviews";
import Spinner from "../ui/Spinner";
import Filter from "../ui/Filter";
import Pagination from "../ui/Pagination";

const StyleList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const RESULTS_PER_PAGE = 10;

export default function Explore() {
  const { reviews, fetchStatus, count, error } = useReviews();

  if (fetchStatus === "fetching") {
    return (
      <StyleList>
        <li>
          <Spinner />
        </li>
      </StyleList>
    );
  }

  return (
    <>
      <Filter
        category="reviewFilter"
        options={[
          { value: "all", label: "All" },
          { value: "recommended", label: "Recommended" },
          { value: "not-recommended", label: "Not Recommended" },
          { value: "mixed-feelings", label: "Mixed Feelings" },
        ]}
      />
      {/* <Sort
        category="reviewSort"
        options={[
          { value: "all", label: "All" },
          { value: "likes", label: "Likes" },
          { value: "dislikes", label: "Dislikes" },
        ]}
      /> */}
      <StyleList>
        {reviews.map((review) => {
          return <ReviewItem review={review} key={review.id} />;
        })}
      </StyleList>
      <Pagination totalResults={count} resultsPerPage={RESULTS_PER_PAGE} />
    </>
  );
}
