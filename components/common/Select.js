import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { useOnClickOutside } from "../../hooks";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Tags from "./Tags";

const Title = styled.h6`
  text-align: center;
  margin: 10px 0px;
  width: 60px;
`;
const Container = styled.div`
  position: relative;
  ${FlexCenterBox}
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const Header = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
  border-bottom: black;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  cursor: pointer;
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
  width: 100px;
  min-height: 100px;
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
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, (e) => {
    if (e.target.name === `modal-btn-${placeholder}`) {
      return;
    }
    setShow(false);
  });
  const handleClick = (curItem) => {
    if (multipleChoices) {
      if (selectedItems.find((item) => item.id === curItem.id)) {
        setSelectedItems(
          selectedItems.filter((item) => item.id !== curItem.id)
        );
      } else {
        setSelectedItems([...selectedItems, curItem]);
      }
    } else {
      setSelectedItems([curItem]);
    }
  };

  const handleRemove = (curItemId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== curItemId));
  };

  return (
    <Container>
      <Header onClick={() => setShow(true)} name={`modal-btn-${placeholder}`}>
        {selectedItems.length > 0 ? (
          <Tags data={selectedItems} handleRemove={handleRemove} />
        ) : (
          <Title>{placeholder}</Title>
        )}
        <ArrowIcon up={show}></ArrowIcon>
      </Header>
      {show && (
        <Modal ref={ref}>
          <List>
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
