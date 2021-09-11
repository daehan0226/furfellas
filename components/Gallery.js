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
  ${(props) => props.theme.media.phone`
    
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  `}
`;

const ImageWrapper = styled.div`
  width: 300px;
  ${FlexCenterBox}
  ${(props) => props.theme.media.phone`
    width: 140px;
  `}
`;

const Image = styled.img`
  width: 280px;
  height: auto;
  ${FlexCenterBox}
  ${(props) => props.theme.media.phone`
    width: 130px;
  `}
`;

const Container = styled.div`
  width: 100%;
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const SelectWrap = styled.div`
  width: 300px;
`;

const Gallery = () => {
  const typeSelect = useSelect("who", usePhotoType);
  const actionSelect = useSelect("what", useAction);
  const locationSelect = useSelect("where", useLocation);
  const sortSelect = useSelect("sort", () => []);

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
