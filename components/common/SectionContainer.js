import styled from "styled-components";

const Container =  styled.section`
  width: 100%;
  min-height: 400px;
  box-sizing: boder-box;
  margin: 40px; 80px;
  background-color: ${({ theme }) => theme.colors.primary.text};
  
  ${(props) => props.theme.media.phone`
      margin: 20px; 40px;
`}
`

const SectionContainer = ({children}) => {
    return <Container>{children}</Container>
}

export default SectionContainer;
