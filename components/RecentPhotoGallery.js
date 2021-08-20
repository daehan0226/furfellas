import styled from "styled-components";
import { SectionContainer, SectionTitle } from "./common";

const ArticleContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const Article = styled.article`
  min-width: 240px;
  height: 300px;
  border-color: ${({ theme }) => theme.colors.primary.dark};
  border-width: 1px;
  border-style: solid;
  margin-right: 10px;
`;

const RecentPhotoGallery = ({ images = null }) => {
  return (
    <SectionContainer>
      <SectionTitle text={"New photos"} />
      <ArticleContainer>
        <Article>image1</Article>
        <Article>image2</Article>
        <Article>image3</Article>
        <Article>image4</Article>
        <Article>image5</Article>
        <Article>image6</Article>
        <Article>image7</Article>
        <Article>image8</Article>
      </ArticleContainer>
    </SectionContainer>
  );
};

export default RecentPhotoGallery;
