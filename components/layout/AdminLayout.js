import styled from "styled-components";
import { Footer } from "../index";
import { AdminNav } from "../nav";

const Main = styled.main`
  width: 100%;
  min-height: 800px;
`;

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default AdminLayout;
