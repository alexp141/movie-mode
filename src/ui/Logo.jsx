import styled from "styled-components";

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
`;

export default function Logo() {
  return (
    <StyledLogoContainer>
      <div>Logo</div>
      <span>Movie Time</span>
    </StyledLogoContainer>
  );
}
