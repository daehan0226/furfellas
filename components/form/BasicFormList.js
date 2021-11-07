import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import BasicForm from "./BasicForm";


const Container = styled.div`
  min-height: 80px;
  margin: 30px;
  ${FlexCenterBox}
  flex-direction: column;
`;

const SubContainer = styled.div`
  width: 300px;
  margin: 10px;
  padding: 6px;
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`

const List = styled.div`
  overflow-y: auto;
  height: 100px;
`


export default function BasicFormList({ resource, items, refresh }) {
  return (
    <Container>
      <SubContainer>
        <h5>{resource}</h5>
        <BasicForm resource={resource} refresh={refresh} />
        <List>
          {items.length > 0 &&
            items.map((item) => (
              <BasicForm key={item.id} data={item} resource={resource} refresh={refresh} />
            ))}
        </List>
      </SubContainer>
    </Container>
  );
}
