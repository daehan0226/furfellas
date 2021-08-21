import { useState } from "react";
import styled from "styled-components";
import { Button, InputFile, Select } from "../common";
import { useSelect } from "../../hooks";
import { FlexCenterBox } from "../../styles/common-styles";
import uploadService from "../../utils/uploadService";

const Container = styled.section`
  min-height: 400px;
`;

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
};

const PhotoForm = ({ closeForm }) => {
  const typeSelect = useSelect("who", SelectOptions.type);
  const actionSelect = useSelect("what", SelectOptions.action);
  const [file, setFile] = useState({});

  const handleSubmit = () => {
    uploadService({
      type: typeSelect.selectedItems,
      action: actionSelect.selectedItems,
      file,
      successCallback: closeForm,
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
        <InputFile file={file} setFile={setFile} />
      </Selects>
      <Button text={"Submit"} onClick={handleSubmit} />
    </Container>
  );
};

export default PhotoForm;
