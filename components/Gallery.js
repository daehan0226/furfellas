import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFetch } from "../hooks";
import { useAction, useLocation, usePet } from "../contexts";
import { SectionContainer, SectionTitle, AntSelect, DateSelect } from "./common";
import { createQueryParams, getCurrentStringDate, addMonthToCurrentDate, strfDatetime } from "../utils/utils";
import { Radio } from 'antd';
import PhotoGallery from "./gallery/PhotoGallery";
import SlideGallery from "./gallery/SlideGallery";
import { FlexCenterBox } from "../styles/common-styles";

import { Menu } from 'antd';

const DateContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  justify-content: center;
`;

const RadioBox = styled.div`
  margin: 10px 0;
`;

const Container = styled.div`
  margin: 20px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;

const DisplayOptionBox = styled.div`
  ${FlexCenterBox}
  justify-content: space-between;
  margin: 0px 30px;
`

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [displayType, setDisplayType] = useState('slide');
  const [datetiemFrom, setDatetimeFrom] = useState(strfDatetime(addMonthToCurrentDate({ months: -1 })));
  const [datetiemTo, setDatetimeTo] = useState(getCurrentStringDate());
  const [sort, setSort] = useState("asc");
  const [selectedItems, setSelectedItems] = useState({
    actions: "",
    locations: "",
    pets: ""
  })

  const handleSelectedItemChange = (key, value) => {
    setSelectedItems({
      ...selectedItems,
      [key]: value
    })
  }

  const actions = useAction();
  const locations = useLocation();
  const pets = usePet();

  const [fetchPhotos, doFetchPhotos] = useFetch([]);

  const getPhotos = (params = "") => {
    doFetchPhotos(`photos/?${params}`);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const params = createQueryParams({
      pet_ids: selectedItems.pets,
      action_ids: selectedItems.actions,
      location_ids: selectedItems.locations,
      start_datetime: datetiemFrom,
      end_datetime: datetiemTo
    });
    getPhotos(params);
  }, [selectedItems, datetiemTo, datetiemFrom]);


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


  const handleTypeChange = (e) => {
    setDisplayType(e.target.value)
  }

  const handleMenuClick = (e) => {
    setSort(e.key)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="asc">
        <span>from old photos</span>
      </Menu.Item>
      <Menu.Item key="desc">
        <span>from new photos</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <SectionContainer>
      <SectionTitle text={"Gallery"} />
      <Container>
        <AntSelect placeholder="Choose actions" onChange={handleSelectedItemChange} selectKey={"actions"} options={actions.data} />
        <AntSelect placeholder="Choose locations" onChange={handleSelectedItemChange} selectKey={"locations"} options={locations.data} />
        <AntSelect placeholder="Choose pets" onChange={handleSelectedItemChange} selectKey={"pets"} options={pets.data} />
      </Container>
      <DisplayOptionBox>
        <RadioBox>
          <Radio.Group defaultValue="slide" buttonStyle="solid" onChange={handleTypeChange} >
            <Radio.Button value="slide">Slide</Radio.Button>
            <Radio.Button value="gallery">Gallery</Radio.Button>
          </Radio.Group>
        </RadioBox>
        <DateContainer>
          <DateSelect title="Start Date" date={datetiemFrom} setDate={setDatetimeFrom} />
          <DateSelect title="End Date" date={datetiemTo} setDate={setDatetimeTo} />
        </DateContainer>
      </DisplayOptionBox>
      <ImageContainer>
        {images.length > 0 && (
          <>
            {displayType === 'slide' &&
              <SlideGallery
                items={images}
              />}
            {displayType === 'gallery' &&
              (<PhotoGallery items={images} />)
            }
          </>
        )}

      </ImageContainer>
    </SectionContainer>
  );
};

export default Gallery;


