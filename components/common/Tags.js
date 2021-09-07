import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Close = styled.div`
  margin-left: 10px;
  cursor: pointer;
  ::before {
    content: "x"; // here is your X(cross) sign.
    color: black;
    font-weight: 300;
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  ${FlexCenterBox}
  color: #1d39c4;
  box-sizing: border-box;
  margin: 4px 0px;
  color: #000000d9;
  font-size: 14px;
  height: auto;
  padding: 0 7px;
  margin: 4px 4px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;
`;

const Tags = ({ data, handleRemove }) => {
  return (
    <Container>
      {data &&
        data.lenght !== 0 &&
        data.map(({ id, name }) => (
          <Tag key={id}>
            {name}
            <Close onClick={() => handleRemove(id)} />
          </Tag>
        ))}
    </Container>
  );
};

export default Tags;
