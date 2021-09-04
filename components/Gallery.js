import { useEffect } from "react";
import styled from "styled-components";
import { useSelect, useFetch } from "../hooks";
import { useAction, useLocation } from "../contexts";
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
  flex-wrap: wrap;
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const SelectWrap = styled.div`
  width: 120px;
`;

const Gallery = ({ images = null }) => {
  const { actions } = useAction();
  const { locations } = useLocation();
  const typeSelect = useSelect("who");
  const actionSelect = useSelect("what");
  const locationSelect = useSelect("where");
  const sortSelect = useSelect("sort");

  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  useEffect(() => {
    doFfetchPhotos("photos/");
  }, []);

  useEffect(() => {
    if (locations.length > 0) {
      locationSelect.setItems([...locations]);
    }
  }, [locations]);

  useEffect(() => {
    sortSelect.setItems([
      { id: 0, name: "New" },
      { id: 1, name: "Old" },
    ]);
  }, []);

  useEffect(() => {
    typeSelect.setItems([
      { id: 0, name: "Together" },
      { id: 1, name: "Aibi" },
      { id: 2, name: "Sevi" },
    ]);
  }, []);

  useEffect(() => {
    if (actions.length > 0) {
      actionSelect.setItems([...actions]);
    }
  }, [actions]);

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
