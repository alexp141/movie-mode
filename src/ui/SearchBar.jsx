import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const SearchSection = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 1 40%;
`;

const StyledSearchBar = styled.input`
  color: var(--color-white);
  border: 1px solid var(--color-stroke);
  border-radius: var(--border-radius-lg);
  padding: 0.8rem 1.2rem;
  background-color: var(--color-form-input);
  font-size: 1.8rem;
  flex: 0 1 50%;

  transition: all 0.3s;

  &:focus {
    outline: 2px solid var(--color-purple);
    outline-offset: -1px;
    flex: 0 1 100%;
  }

  &:active {
    background-color: var(--color-form-input);
  }
`;

const SearchButton = styled.button`
  color: var(--color-white);
  font-size: 1.8rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  background-color: var(--color-purple-light-20);
  border: 1px solid var(--color-purple-light-20);
  border-radius: var(--border-radius-md);
`;

export default function SearchBar() {
  const [searchQuery, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <SearchSection>
      <StyledSearchBar
        type="text"
        placeholder="Search Movies/TV"
        value={searchQuery}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <SearchButton
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
          searchParams.set("query", searchQuery);
          searchParams.set("page", 1);
          setSearchParams(searchParams);
        }}
      >
        Search
      </SearchButton>
    </SearchSection>
  );
}
