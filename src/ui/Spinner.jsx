import styled from "styled-components";

const StyledSpinner = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border: 5px solid #fff;
  border-bottom-color: var(--color-purple);
  border-radius: 50%;
  display: inline-block;
  margin: auto;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner() {
  return <StyledSpinner />;
}
