import { useEffect } from "react";
import styled from "styled-components";
import { useSelect, useFetch } from "../hooks";
import { SectionContainer, SectionTitle, Select } from "./common";
import { FlexCenterBox } from "../styles/common-styles";

const ImageContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${FlexCenterBox}
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

  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  useEffect(() => {
    doFfetchPhotos("photos/");
  }, []);

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
      <ImageContainer>
        {fetchPhotos.data &&
          fetchPhotos.data.length > 0 &&
          fetchPhotos.data.map(({ id, name }) => (
            <ImageWrapper key={id}>
              <img
                src={`https://drive.google.com/thumbnail?id=${id}`}
                alt={name}
              />
            </ImageWrapper>
          ))}
      </ImageContainer>
    </SectionContainer>
  );
};

export default Gallery;
