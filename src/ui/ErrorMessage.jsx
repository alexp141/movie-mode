import styled from "styled-components";

const Message = styled.p`
  color: var(--color-red-700);
`;

export default function ErrorMessage({ msg }) {
  return <Message>{msg}</Message>;
}
