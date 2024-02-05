import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  FaHome,
  FaQuestionCircle,
  FaClipboardList,
  FaGlobeAmericas,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-white);
    font-size: 2.2rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active {
    color: var(--color-purple-light-30);
  }
`;

const StyledNavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function Navbar() {
  return (
    <nav>
      <StyledNavList>
        <li>
          <StyledNavLink to="/">
            <FaHome />
            <p>Home</p>
          </StyledNavLink>
        </li>
        {/* <li>
          <StyledNavLink to="/account">
            <FaUser />
            <p>Account</p>
          </StyledNavLink>
        </li> */}
        <li>
          <StyledNavLink to="/explore">
            <FaGlobeAmericas />
            <p>Explore</p>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/watchList">
            <FaClipboardList />
            <p>Watch List</p>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/about">
            <FaQuestionCircle />
            <p>About</p>
          </StyledNavLink>
        </li>
      </StyledNavList>
    </nav>
  );
}
