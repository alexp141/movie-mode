import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import usePoster from "../services/usePoster";
import Spinner from "./Spinner";
const StyledSearchItem = styled.li`
  border: 1px solid transparent;

  & img {
    height: 100%;
  }
  &:hover {
    border: 1px solid var(--color-purple);
  }
`;

const StyledPoster = styled.img`
  width: 100%;
  height: 100%;
`;

export default function SearchItem({ ids, title }) {
  const navigate = useNavigate();
  const { posterImg, fetchStatus, error } = usePoster(title, ids.imdb);
  const [searchParams, setSearchparams] = useSearchParams();

  if (fetchStatus === "fetching") {
    return <Spinner />;
  }

  return (
    <StyledSearchItem
      onClick={() => {
        navigate(`/queryDetails/${title}`);
        if (ids.imdb) {
          searchParams.set("imdbId", ids.imdb);
          setSearchparams(searchParams, { replace: true });
        }
      }}
    >
      <StyledPoster src={posterImg} alt={`${title}`} />
    </StyledSearchItem>
  );
}

export { StyledSearchItem };
