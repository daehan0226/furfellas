import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { useOnClickOutside } from "../../hooks";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Title = styled.h6`
  text-align: center;
  margin: 10px 0px;
`;
const Container = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  `;

const Header = styled.div`
  ${FlexCenterBox}
  justify-content: space-between;
  padding-left: 6px;
  border-bottom: black;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  cursor: pointer;
  min-width: 80px;
`;

const ArrowIcon = styled(ArrowDownwardIcon)`
  && {
    margin-bottom: 0px;
    margin-left: 6px;
    cursor: pointer;

    transition-duration: 0.4s;
    transition-property: transform;
    ${({ up }) =>
      up &&
      `transform: rotate(180deg);
    `};
  }
`;

const Modal = styled.div`
  top: 0px;
  z-index: 100;
  background: #fff;
  position: absolute;
  outline: 0;
  min-width: 100px;
  max-width: 300px;
  min-height: 60px;
  max-height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  border-radius: 4px;
`;

const List = styled.ul`
  width: calc(100% + 17px);
`;

const ListItem = styled.li`
  overflow: hidden;
  font-size: 14px;
  box-sizing: border-box;
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
  letter-spacing: 0.00938em;
  box-sizing: border-box;
  padding: 6px;
  padding-left: 10px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  ${({ active }) =>
    active &&
    `
  background-color: rgba(0, 0, 0, 0.08);
  font-weight: 500;
  `};
`;

const Select = ({
  placeholder,
  items,
  selectedItems,
  setSelectedItems,
  multipleChoices = true,
  selectAll = false,
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, (e) => {
    setShow(false);
  });
  const handleClick = (curItem) => {
    if (multipleChoices) {
      if (selectedItems.find((item) => item.id === curItem.id)) {
        setSelectedItems(
          selectedItems.filter((item) => item.id !== curItem.id)
        );
      } else {
        let newArray = [...selectedItems, curItem]
        setSelectedItems(
          newArray.sort((a, b) => a.id - b.id))
      }
    } else {
      setSelectedItems([curItem]);
    }
  };

  useEffect(()=>{
    if (!multipleChoices) {
      setShow(false)
    }
  },[selectedItems])

  return (
    <Container ref={ref}>
      <Header onClick={()=>setShow(!show)}>
        <Title onClick={() => setShow(true)}>
          {selectedItems.length === 0 ? placeholder : selectedItems.map(item=>item.name).join(', ')}</Title>
         <ArrowIcon up={show}></ArrowIcon>
      </Header>
      {show && (
        <Modal>
          <List>
          {selectAll && (
              <ListItem
                active={selectedItems.length === items.length} 
                onClick={() => selectedItems.length > 0 ? setSelectedItems([]) : setSelectedItems([...items])}
              >
                Select all
              </ListItem>
          )}  
            {items.map((curItem) => (
              <ListItem
                key={curItem.id}
                active={selectedItems.find((item) => item.id === curItem.id)}
                onClick={() => handleClick(curItem)}
              >
                {curItem.name}
              </ListItem>
            ))}
          </List>
        </Modal>
      )}
    </Container>
  );
};

export default Select;
