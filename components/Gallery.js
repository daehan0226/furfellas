import styled from "styled-components";
import useSelect from "../hooks/useSelect";
import { SectionContainer, SectionTitle, Select } from "./common";

const ImageContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-contents: flex-start;
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const SelectWrap = styled.div`
  width: 120px;
`;

const SelectOptions = {
  type: ["Together", "Sevi", "Aibi"],
  action: ["Playing", "Sleeping", "Rubbing", "Eating", "Barking", "Laying"],
  sort: ["Ascending", "Descending"],
};

const Gallery = ({ images = null }) => {
  const tyleSelect = useSelect("who", SelectOptions.type);
  const actionSelect = useSelect("what", SelectOptions.action);
  const sortSelect = useSelect("sort", SelectOptions.sort);

  return (
    <SectionContainer>
      <SectionTitle text={"Gallery"} />
      <Container>
        <SelectWrap>
          <Select {...tyleSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...actionSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...sortSelect} multipleChoices={false} />
        </SelectWrap>
      </Container>
      <ImageContainer></ImageContainer>
    </SectionContainer>
  );
};

export default Gallery;
