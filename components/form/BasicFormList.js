import { useState } from "react";
import styled from "styled-components";
import BasicForm from "./BasicForm";

const Container = styled.div`
  width: 500px;
  min-height: 80px;
  margin: 20px;
  box-sizing: border-box;
  ${(props) => props.theme.media.tablet`  
    margin: 15px;
  `}
  ${(props) => props.theme.media.phone`  
    margin: 10px;
  `}
`;

const SubContainer = styled.div`
  margin: 5px;
  padding: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`
const Span = styled.span`
  cursor: pointer;
  margin-right: 6px;
`

const List = styled.div`
  overflow-y: scroll;
  height: 100px;
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    margin-right: -10px;
    padding-top: 32px;
    margin-top: -32px;
    margin-bottom: -32px;
    padding-bottom: 32px;

    scrollbar-base-color: #efefef;
    scrollbar-face-color: #666666;
    scrollbar-3dlight-color: #666666;
    scrollbar-highlight-color: #666666;
    scrollbar-track-color: #efefef;
    scrollbar-arrow-color: #666666;
    scrollbar-shadow-color: #666666;
    scrollbar-dark-shadow-color: #666666;

    :after {
      content: "";
      height: 32px;
      display: block;
    }
  }

  @supports (-ms-ime-align: auto) {
    margin-right: -10px;
    padding-top: 16px;
    margin-top: -16px;
    margin-bottom: -16px;
    padding-bottom: 16px;

    :after {
      content: "";
      height: 16px;
      display: block;
    }
  }

  ::-webkit-scrollbar-track {
    background-color: #efefef;
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #666666;
    border: 1px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }

`
const TitleBox = styled.div`
  align-items: center;
  display: flex;
  width: 300px;
`

const ListBox = styled.div`
  box-sizing: border-box;
  padding-left: 16px;
`

const Title = styled.h4`
  margin-bottom: 6px;
  cursor: pointer;
`

const Comment = styled.span`
  margin-bottom: 4px;

`


export default function BasicFormList({ resource, items, refresh }) {
  const [searchKey, setSearchKey] = useState("");

  const includesSting = (src, target) => {
    return src.toLowerCase().includes(target.toLowerCase())
  }

  return (
    <Container>
      <SubContainer>
        <TitleBox>
          <Title>{resource} {items.length}</Title>
        </TitleBox>
        <ListBox>
          <BasicForm resource={resource} refresh={refresh} setSearchKey={setSearchKey} />
          {searchKey !== "" && items.find(item => (includesSting(item.name, searchKey))) && (<Comment>{`Already have this(these) with keword: "${searchKey}"`}</Comment>)}
          <List>
            {items.length > 0 &&
              items.filter(item => (includesSting(item.name, searchKey))).map((item) => (
                <BasicForm key={item.id} data={item} resource={resource} refresh={refresh} />
              ))}
          </List>
        </ListBox>
      </SubContainer>
    </Container>
  );
}
