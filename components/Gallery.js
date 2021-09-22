import { useEffect } from "react";
import styled from "styled-components";
import { useSelect, useFetch } from "../hooks";
import { useAction, useLocation, usePhotoType } from "../contexts";
import { SectionContainer, SectionTitle, Select } from "./common";
import { createQueryParams } from "../utils";
import { FlexCenterBox } from "../styles/common-styles";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div``;

const Image = styled.img`
  width: auto;
  height: 200px;
`;

const Container = styled.div`
  width: 100%;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const SelectWrap = styled.div`
  margin-right: 10px;
`;

const Gallery = () => {
  const typeSelect = useSelect("Who", usePhotoType);
  const actionSelect = useSelect("What", useAction);
  const locationSelect = useSelect("Where", useLocation);
  const sortSelect = useSelect("Sort", () => []);

  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  const getPhotos = (params = "") => {
    doFfetchPhotos(`photos/?${params}`);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const params = createQueryParams({
      types: typeSelect.getSelectedIds(),
      actions: actionSelect.getSelectedIds(),
      locations: locationSelect.getSelectedIds(),
    });
    getPhotos(params);
  }, [
    typeSelect.selectedItems,
    actionSelect.selectedItems,
    locationSelect.selectedItems,
  ]);

  useEffect(() => {
    const sorts = [
      { id: 0, name: "New" },
      { id: 1, name: "Old" },
    ];
    sortSelect.setItems(sorts);
    sortSelect.setSelectedItems([sorts[0]]);
  }, []);

  return (
    <SectionContainer>
      <SectionTitle text={"Gallery"} />
      <Container>
        <SelectWrap>
          <Select {...typeSelect} selectAll={true} />
        </SelectWrap>
        <SelectWrap>
          <Select {...actionSelect} selectAll={true} />
        </SelectWrap>
        <SelectWrap>
          <Select {...locationSelect} selectAll={true} />
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
              <Image
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
