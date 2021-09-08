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
  const [openSubmit, setOpenSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const [descInput, descInputErr] = useInput("Description");

  useEffect(() => {
    if (data) {
      typeSelect.setSelectedItems([data.type]);
      actionSelect.setSelectedItems(data.actions);
      locationSelect.setSelectedItems([data.location]);
      descInput.onChange(data.description);
    }
  }, [data]);

  useEffect(() => {
    if (descInput.value.length > 20) {
      setOpenSubmit(false);
      descInputErr.setMsg("too long");
    } else {
      setOpenSubmit(true);
      descInputErr.setMsg("");
    }
  }, [descInput.value]);

  useEffect(() => {
    setOpenSubmit(false);
    if (typeSelect.selectedItems.length === 0) {
      return;
    }
    if (actionSelect.selectedItems.length === 0) {
      return;
    }
    if (locationSelect.selectedItems.length === 0) {
      return;
    }
    if (!file) {
      return;
    }

    setOpenSubmit(true);
  }, [
    typeSelect.selectedItems,
    actionSelect.selectedItems,
    locationSelect.selectedItems,
    file,
  ]);

  const handleSubmit = () => {
    uploadService({
      id: data ? data.id : null,
      file,
      type: typeSelect.getSelectedIds(),
      actions: actionSelect.getSelectedIds(),
      location: locationSelect.getSelectedIds(),
      description: descInput.value,
      successCallback: () => {
        setFile(null);
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
      <Button
        text={data ? "Edit" : "Submit"}
        onClick={handleSubmit}
        disabled={!openSubmit}
      />
      {data && <Button text={"Delete"} onClick={() => handleDelete(data.id)} />}
    </Container>
  );
};

export default PhotoForm;
