import styled from "styled-components";

const Spacer = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.primary.dark};
`;

const Title = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.primary.text};
  ${(props) => props.theme.media.desktop`
    font-size: 30px;
  `}
  ${(props) => props.theme.media.tablet`
    font-size: 25px;
  `}
  ${(props) => props.theme.media.phone`
    font-size: 20px;
  `}
`;

const Nav = () => (
  <>
    <Container>
      <Title>Fox Lee Fur Fellas</Title>
    </Container>
    <Spacer />
  </>
);

export default Nav;
