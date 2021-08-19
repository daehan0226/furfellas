import styled from "styled-components";
import { Select } from "./common";

const Section = styled.section`
  width: 100%;
  min-height: 400px;
  box-sizing: boder-box;
  margin: 0px 80px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const Title = styled.h2`
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: ${({ theme }) => theme.colors.primary.dark};
  ${(props) => props.theme.media.phone`
  text-align: center;
  `}
`;

const ImageContainer = styled.div`
  display: flex;
`;

const SelectOptions = {
  type: [
    [0, "Together"],
    [1, "Sevi"],
    [2, "Aibi"],
  ],
  action: [
    [0, "Playing"],
    [1, "Sleeping"],
    [2, "Aibi"],
  ],
};

const Gallery = ({ images = null }) => {
  return (
    <Section>
      <Title>Gallery</Title>
      <Select options={SelectOptions.type} />
      <Select options={SelectOptions.action} />
      <ImageContainer></ImageContainer>
    </Section>
  );
};

export default Gallery;
