import styled from "styled-components";
import {Nav, Meta, Footer} from "./index"

const Main = styled.main`
  width: 100%;
  min-height: 800px;
`

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
