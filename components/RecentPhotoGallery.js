import { useEffect } from "react";
import styled from "styled-components";
import { useFetch, useSelect } from "../hooks";
import { createQueryParams } from "../utils";
import { SectionContainer, SectionTitle, Select } from "./common";

const ArticleContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const Article = styled.article`
  min-width: 220px;
  height: 100%;
  border-color: ${({ theme }) => theme.colors.primary.dark};
  border-width: 1px;
  border-style: solid;
  margin-right: 10px;
`;

const RecentPhotoDate = 3;

const RecentPhotoGallery = () => {
  const [fetchPhotos, doFfetchPhotos] = useFetch([]);
  const dateSelect = useSelect("dates", () => []);

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

  return (
    <SectionContainer>
      <SectionTitle text={"New photos"} />
      <Select {...dateSelect} multipleChoices={false} />
      <ArticleContainer>
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
