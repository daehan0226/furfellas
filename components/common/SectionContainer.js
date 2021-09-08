import styled from "styled-components";

const Container = styled.section`
  min-height: 200px;
  margin: 40px auto;
  background-color: ${({ theme }) => theme.colors.primary.text};
  width: 1100px;
  ${(props) => props.theme.media.desktop`
  width: 1100px;
  `}
  ${(props) => props.theme.media.tablet`
    width: 750px;
  `}
  ${(props) => props.theme.media.phone`
    width: 320px;
  `}
`;

const SectionContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SectionContainer;
