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
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  z-index: 100;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.text};
  margin-bottom: 0px;
`;

const Nav = () => (
  <>
    <Container>
      <Title>
        <Link href="/">Fox Lee Fur Fellas</Link>
      </Title>
    </Container>
    <Spacer />
  </>
);

export default Nav;
