import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  font-size: 2rem;

  & h3 {
  }

  & ul {
    margin-left: 1.4rem;
  }

  & li {
    list-style: inside;
  }
`;
const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-purple);
    font-size: 2.2rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    padding-left: 0;
  }

  &:hover,
  &:active {
    color: var(--color-purple-light-30);
  }
`;

export default function About() {
  return (
    <>
      <Section>
        <h2>General</h2>
        <p>
          This is a movie/TV watchlist website created by Alexander Pastor using
          ReactJS.
        </p>
      </Section>
      <Section>
        <h2>Technologies Used</h2>
        <ul>
          <li>ReactJS</li>
          <li>Tanstack React Query</li>
          <li>React Hook Form</li>
          <li>React Icons</li>
          <li>React Toastify</li>
          <li>Styled Components</li>
          <li>Supabase (PostgreSQL)</li>
          <li>React Router</li>
          <li>Dotenv</li>
        </ul>
      </Section>
      <Section>
        <h2>APIs Used</h2>
        <ul>
          <li>
            <StyledLink to="https://fanart.tv/">FanartTv</StyledLink>
          </li>
          <li>
            <StyledLink to="https://www.omdbapi.com/">OMDB API</StyledLink>
          </li>
          <li>
            <StyledLink to="https://simkl.docs.apiary.io/#">
              Simkl API
            </StyledLink>
          </li>
        </ul>
      </Section>
    </>
  );
}
