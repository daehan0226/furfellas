import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, InputFile, Select, Input } from "../common";
import { useSelect, useInput } from "../../hooks";
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
  const [descInput, descInputErr] = useInput();

  const validateInput = () => {
    if (descInput.value === "") {
      descInputErr.setMsg("too short");
      return;
    }
    if (descInput.value.length > 10) {
      descInputErr.setMsg("too long");
      return;
    }
  };

  const handleSubmit = () => {
    uploadService({
      id: data ? data.id : null,
      file,
      type: typeSelect.getSelectedIds(),
      actions: actionSelect.getSelectedIds(),
      location: locationSelect.getSelectedIds(),
      description: descInput.value,
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
      <Input {...descInput} errMsg={descInputErr.msg} />
      <Button text={data ? "Edit" : "Submit"} onClick={handleSubmit} />
      {data && <Button text={"Delete"} onClick={() => handleDelete(data.id)} />}
    </Container>
  );
};

export default PhotoForm;
