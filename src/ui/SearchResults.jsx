import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getSearchResults } from "../services/traktApi";
import SearchItem from "./SearchItem";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import { ITEMS_PER_PAGE } from "../services/traktApi";

const StyledSearchResults = styled.ul`
  display: grid;
  background-color: var(--background-color);
  border: 1px solid var(--section-background-color);
  border-radius: var(--border-radius-lg);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 2rem;

  //styling the scrollbar
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: darkgrey;
    border: 1px solid darkgrey;
  }
`;

const Empty = styled.div`
  margin: 0 auto;
  font-size: xx-large;
`;

export default function SearchResults() {
  let [searchParams] = useSearchParams();

  const {
    isLoading,
    data: { data: movies, totalResults, itemsPerPage } = {},
    error,
    fetchStatus,
  } = useQuery({
    queryKey: [
      "search results",
      searchParams.get("query"),
      searchParams.get("page"),
    ], //if we set it only to searchParams, it will not work since the reference to searchParams is not getting updated
    queryFn: () =>
      getSearchResults({
        searchQuery: searchParams.get("query"),
        pageNumber: searchParams.get("page") || 1,
      }),
  });

  if (error) {
    <StyledSearchResults>An Error Occurred</StyledSearchResults>;
  }

  if (fetchStatus === "fetching" || isLoading) {
    return <Spinner />;
  }

  if (!movies) {
    return <Empty>Search movies and TV</Empty>;
  }

  return (
    <>
      <StyledSearchResults>
        {movies.map(({ type, [type]: item }, i) => {
          //this is needed because traktApi sometimes returns ITEMS_PER_Page + 1 results
          if (i >= ITEMS_PER_PAGE) {
            return null;
          }

          return (
            <SearchItem
              key={item.ids.imdb ?? item.ids.trakt}
              ids={item.ids}
              title={item.title}
            />
          );
        })}
      </StyledSearchResults>
      <Pagination totalResults={totalResults} resultsPerPage={itemsPerPage} />
    </>
  );
}

export { StyledSearchResults };
