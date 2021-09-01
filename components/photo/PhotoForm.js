import { useState } from "react";
import styled from "styled-components";
import { Button, InputFile, Select } from "../common";
import { useSelect } from "../../hooks";
import { FlexCenterBox } from "../../styles/common-styles";
import uploadService from "../../utils/uploadService";

const Container = styled.section``;

const Selects = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 6px;
`;

const SelectOptions = {
  type: ["Together", "Sevi", "Aibi"],
  action: ["Playing", "Sleeping", "Rubbing", "Eating", "Barking", "Laying"],
  location: ["House", "Dog park"],
};

const PhotoForm = ({ data }) => {
  const typeSelect = useSelect("Who", SelectOptions.type);
  const actionSelect = useSelect("What", SelectOptions.action);
  const locationSelect = useSelect("Where", SelectOptions.location);
  const [file, setFile] = useState({});

  const handleSubmit = () => {
    uploadService({
      id: data ? data.id : null,
      type: typeSelect.selectedItems,
      action: actionSelect.selectedItems,
      location: locationSelect.selectedItems,
      file,
      successCallback: () => {},
      failCallback: () => {
        console.log("fail");
      },
    });
  };

  return (
    <Container>
      <Selects>
        <Select {...typeSelect} />
        <Select {...actionSelect} />
        <Select {...locationSelect} />
        {data ? (
          <img
            src={`https://drive.google.com/thumbnail?id=${data.id}`}
            alt={data.name}
          />
        ) : (
          <InputFile file={file} setFile={setFile} />
        )}
      </Selects>
      <Button text={data ? "Edit" : "Submit"} onClick={handleSubmit} />
    </Container>
  );
};

export default PhotoForm;
