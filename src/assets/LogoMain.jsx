import styled from "styled-components";
import popcorn from "/src/assets/popcorn.png";
const StyleLogo = styled.img`
  margin: 0 auto;
  max-width: 60%;
`;

export default function LogoMain() {
  return <StyleLogo src={popcorn} alt="popcorn" />;
}
