import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const FilterButton = styled.button`
  color: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
  background-color: var(--color-purple-light-20);

  border: 1px solid var(--color-purple-light-20);
  border-radius: 3px;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-purple-dark-40);
      border: 1px solid var(--color-purple-dark-60);
    `};
`;
export default function Filter({ category, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(category);

  function handleClick(option) {
    searchParams.set(category, option.value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => {
        return (
          <FilterButton
            key={option.value}
            active={currentFilter === option.value}
            onClick={() => handleClick(option)}
          >
            {option.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}
