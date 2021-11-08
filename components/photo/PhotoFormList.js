import { useEffect } from "react";
import styled from "styled-components";

import { useFetch } from "../../hooks";
import { PhotoForm } from ".";

const Container = styled.div`
  width: 100%;
  min-height: 80px;
  margin: 30px;
`;

const Title = styled.h4`
`


export default function PhotoFormList() {
  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  const refreshPhotos = () => {
    doFfetchPhotos("photos/");
  };

  useEffect(() => {
    refreshPhotos();
  }, []);

  return (
    <Container>
      <Title>Photos</Title>
      <PhotoForm refreshPhotos={refreshPhotos} />
      {fetchPhotos.data &&
        fetchPhotos.data.length > 0 &&
        fetchPhotos.data.map((photo) => (
          <PhotoForm
            key={photo.id}
            data={photo}
            refreshPhotos={refreshPhotos}
          />
        ))}
      <></>
    </Container>
  );
}
