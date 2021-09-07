import styled from "styled-components";
import { PrimaryBtn } from "../../styles/common-styles";

const Btn = styled.button`
  ${PrimaryBtn}

  :disabled {
    cursor: not-allowed;
    color: #ff7875;
    text-decoration: line-through;
    background: #fff;
    border-color: #ff7875;
  }
`;

const Button = ({ text, onClick = () => {}, name = "", disabled = false }) => {
  return (
    <Btn name={name} onClick={() => onClick()} disabled={disabled}>
      {text}
    </Btn>
  );
};

export default Button;
