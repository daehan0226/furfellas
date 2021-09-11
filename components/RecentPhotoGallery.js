import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useFetch, useSelect, useWindowDimensions } from "../hooks";
import { FlexCenterBox } from "../styles/common-styles";
import { createQueryParams } from "../utils";
import { SectionContainer, SectionTitle, Select } from "./common";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const ArticleContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  touch-action: auto;
  `;

const Article = styled.article`
  width: 100%;
  max-width: 220px;
  height: 100%;
  margin-right: 10px;
  align-self: center;
`;
const Scroll = styled.div`
  ${FlexCenterBox}
`;

const ArrowButton = styled.button`
  opacity: 0.2;

  ${({ active }) =>
    active &&
    `
    cursor: pointer;
    opacity: 1;
  `};
`;

const RecentPhotoDate = 3;

const RecentPhotoGallery = () => {
  const [fetchPhotos, doFfetchPhotos] = useFetch([]);
  const { width } = useWindowDimensions();
  const [showArrows, setShowArrows] = useState({ left: false, right: false });
  const ref = useRef(null);
  const dateSelect = useSelect("dates", () => []);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const getPhotos = (selectedDate) => {
    const date = new Date();
    let searchStartDate = date.yyyymmdd();
    if (selectedDate === "") {
      searchStartDate -= RecentPhotoDate;
    } else {
      searchStartDate -= parseInt(selectedDate);
    }
    const params = createQueryParams({
      start_datetime: searchStartDate,
    });
    doFfetchPhotos(`photos/?${params}`);
  };

  useEffect(() => {
    getPhotos(dateSelect.getSelectedIds());
  }, [dateSelect.selectedItems]);

  useEffect(() => {
    let dates = [];
    for (let i = 1; i < 8; i++) {
      dates.push({ id: i, name: `from ${i} day(s) ago` });
    }
    dateSelect.setItems(dates);
    dateSelect.setSelectedItems([dates[2]]);
  }, []);

  const handleShowArrows = (event) => {

    // left
    if (width === 0) {
      setShowArrows({ ...showArrows, left: false });
    }

    if (event) {
      const { scrollLeft } = event.target;
      // left
      if (scrollLeft >= 100) {
        setShowArrows({ ...showArrows, left: true });
      } else {
        setShowArrows({ ...showArrows, left: false });
      }

      // right
      if (scrollLeft + 230 < ref.current.offsetWidth) {
        setShowArrows({ ...showArrows, right: true });
      } else {
        setShowArrows({ ...showArrows, right: false });
      }
    }
  };

  useEffect(() => {
    handleShowArrows();
  }, [fetchPhotos.data]);

  return (
    <SectionContainer>
      <SectionTitle text={"New photos"} />
      <Select {...dateSelect} multipleChoices={false} />
      <Scroll>
        <ArrowButton active={true} onClick={() => scroll(-100)}>
          <ArrowBackIosIcon />
        </ArrowButton>
        <ArticleContainer onScroll={handleShowArrows} ref={ref}>
          {fetchPhotos.data &&
            fetchPhotos.data.length > 0 &&
            fetchPhotos.data.map(({ id, image_id, name }) => (
              <Article key={id}>
                <img
                  src={`https://drive.google.com/thumbnail?id=${image_id}`}
                  alt={name}
                />
              </Article>
            ))}
        </ArticleContainer>

        <ArrowButton active={true} onClick={() => scroll(100)}>
          <ArrowForwardIosIcon />
        </ArrowButton>
      </Scroll>
    </SectionContainer>
  );
};

export default RecentPhotoGallery;

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("");
};
