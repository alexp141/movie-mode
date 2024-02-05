import styled, { css } from "styled-components";

const StyledSort = styled.div`
  display: flex;
  gap: 1.2rem;
`;
const SortButton = styled.button`
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

export default function Sort() {
  return (
    <StyledSort>
      <SortButton>test</SortButton>
    </StyledSort>
  );
}
