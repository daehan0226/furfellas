import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelect, useFetch } from "../hooks";
import { useAction, useLocation, usePhotoType } from "../contexts";
import { SectionContainer, SectionTitle, Select, Sort } from "./common";
import { createQueryParams } from "../utils";

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
  const [images, setImages] = useState([]);
  const [sort, setSort] = useState("asc");
  const typeSelect = useSelect("Who", usePhotoType);
  const actionSelect = useSelect("What", useAction);
  const locationSelect = useSelect("Where", useLocation);

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
    let sorted = [];
    if (sort === "asc") {
      sorted = images.sort((a, b) => (a.datetime > b.datetime ? 1 : -1));
    } else {
      sorted = images.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
    }
    setImages([...sorted]);
  }, [sort]);

  useEffect(() => {
    if (fetchPhotos.data.length > 0) {
      setImages([...fetchPhotos.data]);
    } else {
      setImages([]);
    }
  }, [fetchPhotos.data]);

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
        <Sort title={"Date time"} sort={sort} setSort={setSort} />
      </Container>
      <ImageContainer>
        {images.map(({ id, image_id, name }) => (
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
