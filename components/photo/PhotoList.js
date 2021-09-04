import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../common";
import { useSelect, useFetch } from "../../hooks";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.section``;

const ImageList = styled.div``;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const SelectOptions = {
  type: ["Together", "Sevi", "Aibi"],
  action: ["Playing", "Sleeping", "Rubbing", "Eating", "Barking", "Laying"],
};

const PhotoList = ({}) => {
  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  useEffect(() => {
    doFfetchPhotos("photos/");
  }, []);

  return (
    <Container>
      <ImageList>
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
      </ImageList>
      <Button text={"edit"} onClick={() => {}} />
    </Container>
  );
};

export default PhotoList;
