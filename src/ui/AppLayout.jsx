import styled from "styled-components";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import useUser from "../services/useUser";
import Spinner from "./Spinner";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--background-color);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;

  //styling the scrollbar
  &::-webkit-scrollbar {
    width: 0.7rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: darkgrey;
    border: 1px solid darkgrey;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  padding: 2rem 8rem;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-purple);
  border-bottom: 1px solid var(--color-purple-light-60);
`;

const Container = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  background-color: var(--background-color);
`;

const P = styled.p`
  flex: 0 1 auto;
`;

export default function AppLayout() {
  const { user, fetchStatus } = useUser();

  const username = user.user_metadata.username;

  return (
    <StyledAppLayout>
      <StyledHeader>
        <SearchBar />
        <P>{`Welcome, ${username}`}</P>
      </StyledHeader>
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
