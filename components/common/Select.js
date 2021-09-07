import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { useOnClickOutside } from "../../hooks";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Title = styled.h6`
  text-align: center;
  margin: 10px 0px;
  width: 60px;
`;
const Container = styled.div`
  position: relative;
  ${FlexCenterBox}
  justify-content: flex-start;
`;
const Header = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
  margin-right: 20px;
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

const Close = styled.div`
  margin-left: 10px;
  ::before {
    content: "x"; // here is your X(cross) sign.
    color: black;
    font-weight: 300;
    font-family: Arial, sans-serif;
  }
`;

const TagList = styled.div`
  ${FlexCenterBox}
`;

const Tag = styled.span`
  ${FlexCenterBox}
  color: #1d39c4;
  background: #f0f5ff;
  border-color: #adc6ff;
  box-sizing: border-box;
  margin: 4px 0px;
  color: #000000d9;
  font-size: 14px;
  height: auto;
  padding: 0 7px;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  opacity: 1;
  transition: all 0.3s;
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
    console.log(e);
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
      <Header>
        <Title>{placeholder}</Title>
        <ArrowIcon
          onClick={() => setShow(true)}
          name={`modal-btn-${placeholder}`}
          up={show}
        ></ArrowIcon>
      </Header>
      <TagList>
        {selectedItems.lenght !== 0 &&
          selectedItems.map(({ id, name }) => (
            <Tag key={id}>
              {name}
              <Close onClick={() => handleRemove(id)} />
            </Tag>
          ))}
      </TagList>

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
