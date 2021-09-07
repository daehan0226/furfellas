import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, InputFile, Select } from "../common";
import { useSelect } from "../../hooks";
import { useAction, useLocation, usePhotoType } from "../../contexts";
import uploadService from "../../utils/uploadService";
import { deleteResources } from "../../utils";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Selects = styled.div`
  padding: 6px;
`;

const Image = styled.img`
  width: 200px;
  height: auto;
`;

const PhotoForm = ({ data, refreshPhotos = () => {} }) => {
  const typeSelect = useSelect("who", usePhotoType);
  const actionSelect = useSelect("what", useAction);
  const locationSelect = useSelect("where", useLocation);
  const [file, setFile] = useState({});

  const handleSubmit = () => {
    uploadService({
      id: data ? data.id : null,
      file,
      type: typeSelect.getSelectedIds(),
      actions: actionSelect.getSelectedIds(),
      location: locationSelect.getSelectedIds(),
      description: "",
      successCallback: () => {
        setFile({});
        typeSelect.setSelectedItems([]);
        actionSelect.setSelectedItems([]);
        locationSelect.setSelectedItems([]);
        refreshPhotos();
      },
      failCallback: () => {
        console.log("fail");
      },
    });
  };

  const handleDelete = (id) => {
    deleteResources({
      id,
      resource: "photos",
      successCallback: () => {
        refreshPhotos;
      },
    });
  };

  return (
    <Container>
      <Selects>
        <Select {...typeSelect} multipleChoices={false} />
        <Select {...actionSelect} />
        <Select {...locationSelect} multipleChoices={false} />
      </Selects>
      {data ? (
        <Image
          src={`https://drive.google.com/thumbnail?id=${data.image_id}`}
          alt={data.name}
        />
      ) : (
        <InputFile file={file} setFile={setFile} />
      )}
      <Button text={data ? "Edit" : "Submit"} onClick={handleSubmit} />
      {data && <Button text={"Delete"} onClick={() => handleDelete(data.id)} />}
    </Container>
  );
};

export default PhotoForm;
