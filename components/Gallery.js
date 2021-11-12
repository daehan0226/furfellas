import { useEffect, useState } from "react";
import styled from "styled-components";
import ImageGallery from 'react-image-gallery';
import { useSelect, useFetch } from "../hooks";
import { useAction, useLocation, usePhotoType } from "../contexts";
import { SectionContainer, SectionTitle, Select, Sort, Skeletons } from "./common";
import { createQueryParams } from "../utils";

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
`;

const ImageWrapper = styled.div``;


const ImageGalleryWrapper = styled(ImageGallery)`
  display: 'none';
`;

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
      type_ids: typeSelect.getSelectedIds(),
      action_ids: actionSelect.getSelectedIds(),
      location_ids: locationSelect.getSelectedIds(),
    });
    getPhotos(params);
  }, [
    typeSelect.selectedItems,
    actionSelect.selectedItems,
    locationSelect.selectedItems,
  ]);

  const addSlideProperties = (item) => {
    return ({
      ...item,
      originalHeight: 400,
      thumbnailHeight: 80
    })
  }

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
      setImages([...fetchPhotos.data.map(addSlideProperties)]);
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
      </Container>
      <Sort title={"Date time"} sort={sort} setSort={setSort} />
      <ImageContainer>
        {fetchPhotos.loading && (
          <Skeletons />
        )}
        {images && images.length > 0 && (
          <ImageGalleryWrapper
            items={images}
          />
        )}
        {/* {images.map(({ id, image_id, name }) => (
          <ImageWrapper key={id}>
            <Image
              src={`https://drive.google.com/thumbnail?id=${image_id}`}
              alt={name}
            />
          </ImageWrapper>
        ))} */}
      </ImageContainer>
    </SectionContainer>
  );
};

export default Gallery;


