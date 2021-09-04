import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, InputFile, Select } from "../common";
import { useSelect } from "../../hooks";
import { useAction, useLocation } from "../../contexts";
import { FlexCenterBox } from "../../styles/common-styles";
import uploadService from "../../utils/uploadService";
import { deleteResources } from "../../utils";

const Container = styled.section``;

const Selects = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 6px;
`;

const PhotoForm = ({ data, refreshPhotos = () => {} }) => {
  const { actions } = useAction();
  const { locations } = useLocation();
  const typeSelect = useSelect("who");
  const actionSelect = useSelect("what");
  const locationSelect = useSelect("where");
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

  useEffect(() => {
    if (locations.length > 0) {
      locationSelect.setItems([...locations]);
    }
  }, [locations]);

  useEffect(() => {
    typeSelect.setItems([
      { id: 0, name: "Together" },
      { id: 1, name: "Aibi" },
      { id: 2, name: "Sevi" },
    ]);
  }, []);

  useEffect(() => {
    if (actions.length > 0) {
      actionSelect.setItems([...actions]);
    }
  }, [actions]);

  return (
    <Container>
      <Selects>
        <Select {...typeSelect} multipleChoices={false} />
        <Select {...actionSelect} />
        <Select {...locationSelect} multipleChoices={false} />
        {data ? (
          <img
            src={`https://drive.google.com/thumbnail?id=${data.image_id}`}
            alt={data.name}
          />
        ) : (
          <InputFile file={file} setFile={setFile} />
        )}
      </Selects>
      <Button text={data ? "Edit" : "Submit"} onClick={handleSubmit} />
      {data && <Button text={"Delete"} onClick={() => handleDelete(data.id)} />}
    </Container>
  );
};

export default PhotoForm;
