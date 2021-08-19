import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  min-height: 400px;
  box-sizing: boder-box;
  margin: 0px 80px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const Title = styled.h2`
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: ${({ theme }) => theme.colors.primary.dark};
  ${(props) => props.theme.media.phone`
  text-align: center;
  `}
`;

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
    <Section>
      <Title>New photos</Title>
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
    </Section>
  );
};

export default RecentPhotoGallery;
