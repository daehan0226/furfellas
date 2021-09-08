import { useEffect } from "react";
import styled from "styled-components";
import { useSelect, useFetch } from "../hooks";
import { useAction, useLocation, usePhotoType } from "../contexts";
import { SectionContainer, SectionTitle, Select } from "./common";
import { createQueryParams } from "../utils";
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
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const SelectWrap = styled.div`
  width: 300px;
`;

const Gallery = ({ images = null }) => {
  const typeSelect = useSelect("who", usePhotoType);
  const actionSelect = useSelect("what", useAction);
  const locationSelect = useSelect("where", useLocation);
  const sortSelect = useSelect("sort", () => []);

  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  useEffect(() => {
    doFfetchPhotos("photos/");
  }, []);

  useEffect(() => {
    console.log(typeSelect.getSelectedIds());
    console.log(actionSelect.getSelectedIds());
    console.log(locationSelect.getSelectedIds());
    const params = createQueryParams({
      types: typeSelect.getSelectedIds(),
      actions: actionSelect.getSelectedIds(),
      locations: locationSelect.getSelectedIds(),
    });

    doFfetchPhotos(`photos/?${params}`);
  }, [
    typeSelect.selectedItems,
    actionSelect.selectedItems,
    locationSelect.selectedItems,
  ]);

  useEffect(() => {
    sortSelect.setItems([
      { id: 0, name: "New" },
      { id: 1, name: "Old" },
    ]);
  }, []);

  return (
    <SectionContainer>
      <SectionTitle text={"Gallery"} />
      <Container>
        <SelectWrap>
          <Select {...typeSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...actionSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...locationSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...sortSelect} multipleChoices={false} />
        </SelectWrap>
      </Container>
      <ImageContainer>
        {fetchPhotos.data &&
          fetchPhotos.data.length > 0 &&
          fetchPhotos.data.map(({ id, image_id, name }) => (
            <ImageWrapper key={id}>
              <img
                src={`https://drive.google.com/thumbnail?id=${image_id}`}
                alt={name}
              />
            </ImageWrapper>
          ))}
      </ImageContainer>
    </SectionContainer>
  );
};

export default Gallery;
