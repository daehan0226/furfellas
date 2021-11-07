import { useState } from "react";
import styled from "styled-components";
import BasicForm from "./BasicForm";


const Container = styled.div`
  width: 100%;
  min-height: 80px;
  margin: 30px;
  box-sizing: border-box;
  ${(props) => props.theme.media.tablet`  
    margin: 15px;
  `}
`;

const SubContainer = styled.div`
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`
const Span = styled.span`
  cursor: pointer;
`

const List = styled.div`
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  height: 100px;

  ::-webkit-scrollbar {
    width: 0;
  height: 0;
  }
`

const Title = styled.h4`
`


export default function BasicFormList({ resource, items, refresh }) {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <SubContainer>
        <Title>{resource}</Title>
        <Span onClick={() => { setShow(!show) }}>{show ? "hide" : "show"}</Span>
        {show && (
          <>
            <BasicForm resource={resource} refresh={refresh} />
            <List>
              {items.length > 0 &&
                items.map((item) => (
                  <BasicForm key={item.id} data={item} resource={resource} refresh={refresh} />
                ))}
            </List>
          </>
        )}
      </SubContainer>
    </Container>
  );
}
