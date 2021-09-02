import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { useFetch } from "../../hooks";
import { PhotoForm } from "../../components/photo";

const Container = styled.div`
  min-height: 80px;
  margin: 30px;
`;

export default function Index() {
  const [fetchPhotos, doFfetchPhotos] = useFetch([]);

  useEffect(() => {
    doFfetchPhotos("photos/");
  }, []);

  return (
    <Container>
      <Link href={"/admin/action"}>Action</Link>
      <PhotoForm></PhotoForm>
      <PhotoForm />
      {fetchPhotos.data &&
        fetchPhotos.data.length > 0 &&
        fetchPhotos.data.map((photo) => (
          <PhotoForm key={photo.id} data={photo} />
        ))}
      <></>
    </Container>
  );
}
