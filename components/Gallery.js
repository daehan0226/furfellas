import { useEffect, useState } from "react";
import styled from "styled-components";
import ImageGallery from 'react-image-gallery';
import { useSelect, useFetch } from "../hooks";
import { useAction, useLocation, usePhotoType } from "../contexts";
import { SectionContainer, SectionTitle, Select, Sort, Skeletons } from "./common";
import { createQueryParams } from "../utils";
import { Radio } from 'antd';


const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
`;

const GalleryContainer = styled.div`
    /* Prevent vertical gaps */
    line-height: 0;
    
    -webkit-column-count: 5;
    -webkit-column-gap:   0px;
    -moz-column-count:    5;
    -moz-column-gap:      0px;
    column-count:         5;
    column-gap:           0px;  

  ${(props) => props.theme.media.desktop`
    -moz-column-count:    4;
    -webkit-column-count: 4;
    column-count:         4;
  `}
  ${(props) => props.theme.media.tablet`
    -moz-column-count:    3;
    -webkit-column-count: 3;
    column-count:         3s;
  `}
  ${(props) => props.theme.media.phone`
    -moz-column-count:    2;
    -webkit-column-count: 2;
    column-count:         2;
  `}
`

const GalleryImage = styled.img`
  width: 100% !important;
  height: auto !important;
`


const RadioBox = styled.div`
  margin: 10px 0;
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
  const [slideImages, setSlideImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [displayType, setDisplayType] = useState('slide');
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

  const setSlideProperties = (item) => {
    return ({
      ...item,
      originalHeight: 400,
      thumbnailHeight: 80
    })
  }

  const setGalleryProperties = (item) => {
    return ({
      src: item.original,
      ...item
    })
  }

  useEffect(() => {
    let sortedSlideImages = [];
    let sortedGalleryImages = [];
    if (sort === "asc") {
      sortedSlideImages = slideImages.sort((a, b) => (a.datetime > b.datetime ? 1 : -1));
      sortedGalleryImages = galleryImages.sort((a, b) => (a.datetime > b.datetime ? 1 : -1));
    } else {
      sortedSlideImages = slideImages.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
      sortedGalleryImages = galleryImages.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
    }
    setSlideImages([...sortedSlideImages]);
    setGalleryImages([...sortedGalleryImages]);
  }, [sort]);

  useEffect(() => {
    if (fetchPhotos.data.length > 0) {
      setSlideImages([...fetchPhotos.data.map(setSlideProperties)]);
      setGalleryImages([...fetchPhotos.data.map(setGalleryProperties)]);
    } else {
      setSlideImages([]);
      setGalleryImages([]);
    }
  }, [fetchPhotos.data]);


  const handleTypeChange = (e) => {
    setDisplayType(e.target.value)
  }

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
      <RadioBox>
        <Radio.Group defaultValue="slide" buttonStyle="solid" onChange={handleTypeChange} >
          <Radio.Button value="slide">Slide</Radio.Button>
          <Radio.Button value="gallery">Gallery</Radio.Button>
        </Radio.Group>
      </RadioBox>

      <ImageContainer>
        {fetchPhotos.loading && (
          <Skeletons />
        )}
        {fetchPhotos.data && fetchPhotos.data.length > 0 && (
          <>
            {displayType === 'slide' &&
              <ImageGallery
                items={slideImages}
              />}
            {displayType === 'gallery' &&
              <GalleryContainer>
                {galleryImages.map(({ id, src, name }) => (
                  <div key={id}>
                    <GalleryImage
                      src={src}
                      alt={name}
                    />
                  </div>
                ))}
              </GalleryContainer>
            }
          </>
        )}

      </ImageContainer>
    </SectionContainer>
  );
};

export default Gallery;


