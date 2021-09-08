import styled from "styled-components";
import Link from "next/link";
import { FlexCenterBox } from "../../styles/common-styles";

const Spacer = styled.div`
  height: 80px;
  ${(props) => props.theme.media.desktop`
    height: 80px;
  `}
  ${(props) => props.theme.media.tablet`
    height: 70px;
  `}
  ${(props) => props.theme.media.phone`
    height: 60px;
  `}
`;

const Container = styled(Spacer)`
  ${FlexCenterBox}
  justify-content: flex-end;
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  z-index: 100;
`;

const Title = styled.h5`
  color: ${({ theme }) => theme.colors.primary.text};
  margin: 0 10px;
`;

const routes = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/admin",
    text: "Admin",
  },
];

const AdminNav = () => (
  <>
    <Container>
      {routes.map(({ href, text }) => (
        <Title key={text}>
          <Link href={href}>{text}</Link>
        </Title>
      ))}
    </Container>
    <Spacer />
  </>
);

export default AdminNav;
