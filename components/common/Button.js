import styled from "styled-components";
import { PrimaryBtn } from "../../styles/common-styles";

const Btn = styled.button`
  ${PrimaryBtn}
`;

const Button = ({ text, onClick = () => {}, name = "" }) => {
  return (
    <Btn name={name} onClick={() => onClick()}>
      {text}
    </Btn>
  );
};

export default Button;
