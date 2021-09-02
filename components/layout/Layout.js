import styled from "styled-components";
import { Meta, Footer } from "../index";
import { Nav } from "../nav";

const Main = styled.main`
  width: 100%;
  min-height: 800px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
