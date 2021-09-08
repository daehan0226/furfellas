import styled from "styled-components";

const Container = styled.section`
  min-height: 200px;
  margin: 40px auto;
  background-color: ${({ theme }) => theme.colors.primary.text};
  width: 90%;
`;

const SectionContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SectionContainer;
