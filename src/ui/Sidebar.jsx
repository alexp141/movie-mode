import styled from "styled-components";
import Navbar from "./Navbar";
import Logout from "./Logout";
import LogoMain from "../assets/LogoMain";

const StyledSidebar = styled.aside`
  background-color: var(--sidebar-background-color);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-purple-dark-60);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  & button {
    margin-top: auto;
  }

  & > p {
    text-align: center;
  }
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <LogoMain />
      <Navbar />
      <Logout />
    </StyledSidebar>
  );
}
