import styled from "styled-components";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;

export default function Pagination({ totalResults, resultsPerPage }) {
  let [searchParams, setSearchParams] = useSearchParams();
  let currPageNumber = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <StyledPagination>
      <Button
        disabled={currPageNumber <= 1}
        onClick={() => {
          searchParams.set("page", currPageNumber - 1);
          setSearchParams(searchParams);
        }}
      >
        Prev Page
      </Button>
      <Button
        disabled={currPageNumber >= totalPages}
        onClick={() => {
          searchParams.set("page", currPageNumber + 1);
          setSearchParams(searchParams);
        }}
      >
        Next Page
      </Button>
    </StyledPagination>
  );
}
