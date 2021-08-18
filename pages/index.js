import styled from "styled-components";
import Nav from "../components/Nav";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function Home() {
  return (
    <>
      <Nav />
      <Title>My page</Title>
    </>
  );
}
