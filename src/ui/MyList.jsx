import styled from "styled-components";
import { StyledSearchResults } from "./SearchResults";
import { StyledSearchItem } from "./SearchItem";
import useWatchList from "../services/useWatchList";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import { FaStar } from "react-icons/fa";

const Card = styled(StyledSearchItem)`
  position: relative;
  font-size: 2rem;

  & img {
    width: 100%;
    height: 100%;
  }

  & div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    height: 15%;
    width: 100%;
    gap: 0.4rem;
  }

  & div p {
    transform: translate(
      0,
      0.2rem
    ); // to align text with svg since flexbox doesn't work
  }
`;

export default function MyList() {
  const { data, isLoading, fetchStatus } = useWatchList();
  const navigate = useNavigate();
  const RESULTS_PER_PAGE = 20;

  if (!fetchStatus === "fetching" || isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <StyledSearchResults>
        {data.map((entry) => {
          return (
            <Card
              key={entry.imdb_id}
              onClick={() => {
                navigate(`/queryDetails/${entry.title}`);
              }}
            >
              <img src={entry.poster} alt={`poster of ${entry.title}`} />
              <div>
                <p>{`Your score: ${entry.rating} `}</p>
                <FaStar />
              </div>
            </Card>
          );
        })}
      </StyledSearchResults>
      <Pagination
        totalResults={data.length}
        resultsPerPage={RESULTS_PER_PAGE}
      />
    </>
  );
}
