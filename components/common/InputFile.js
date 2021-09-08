import { useState, useEffect } from "react";
import styled from "styled-components";
import { FlexCenterBox, PrimaryBtn } from "../../styles/common-styles";
import Button from "./Button";

const Container = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
`;

const Input = styled.input`
  &[type="file"] {
    display: none;
  }
`;

const PreviewImg = styled.img`
  width: 100px;
  height: auto;
`;

const Span = styled.span`
  ${PrimaryBtn}
`;

const InputFile = ({ file, setFile }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const onChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
  };

  const onDelete = () => {
    setFile(null);
    setImgSrc(null);
  };

  useEffect(() => {
    if (!file) {
      setImgSrc(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImgSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Container>
      <label>
        <Input type="file" multiple onChange={onChange} />
        <Span>Attach</Span>
      </label>
      {file && file.name && (
        <Container>
          <span>{file.name}</span>
          <PreviewImg src={imgSrc} alt={file.name} />
          <Button text={"Delete"} onClick={onDelete} />
        </Container>
      )}
    </Container>
  );
};

export default InputFile;
