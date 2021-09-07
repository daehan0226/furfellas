import styled from "styled-components";

const InputContainer = styled.div`
  margin: 20px 0px;
`;

const InputBasic = styled.input`
  width: 200px;
`;
const ErrMsg = styled.span`
  width: 200px;
`;

const Input = ({ value, onChange, placeholder, errMsg }) => {
  return (
    <InputContainer>
      <InputBasic
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <ErrMsg>{errMsg}</ErrMsg>
    </InputContainer>
  );
};

export default Input;
