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

const Span = styled.span`
  ${PrimaryBtn}
`;

const InputFile = ({ file, setFile }) => {
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onDelete = () => {
    setFile({});
  };

  return (
    <Container>
      <label>
        <Input type="file" multiple onChange={onChange} />
        <Span>Attach</Span>
      </label>
      {file.name && (
        <Container>
          <p>{file.name}</p>
          <Button text={"Delete"} onClick={onDelete} />
        </Container>
      )}
    </Container>
  );
};

export default InputFile;
