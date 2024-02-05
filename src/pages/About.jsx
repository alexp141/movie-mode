import styled from "styled-components";

const Section = styled.section`
  font-size: 2rem;

  & h3 {
  }
`;
export default function About() {
  return (
    <Section>
      <h3>General</h3>
      <p>general info</p>
    </Section>
  );
}
