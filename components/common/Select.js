import { useState, useRef } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { useOnClickOutside } from "../../hooks";
import Button from "./Button";

const Title = styled.h4`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0px;
`;
const Container = styled.div`
  position: relative;
`;
const Header = styled.div`
  ${FlexCenterBox}
`;

const Modal = styled.div`
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
  flex-direction: column;
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
  options,
  selectedItems,
  setSelectedItem,
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

  const handleClick = (option) => {
    if (multipleChoices) {
      if (selectedItems.includes(option)) {
        setSelectedItem(selectedItems.filter((item) => item !== option));
      } else {
        setSelectedItem([...selectedItems, option]);
      }
    } else {
      setSelectedItem([option]);
    }
  };

  const handleRemove = (option) => {
    setSelectedItem(selectedItems.filter((item) => item !== option));
  };

  return (
    <Container>
      <div>
        <Header>
          <Title>{placeholder}</Title>
          <Button
            name={`modal-btn-${placeholder}`}
            onClick={() => setShow(!show)}
            text={show ? "close" : "open"}
          />
        </Header>
        <TagList>
          {selectedItems.lenght !== 0 &&
            selectedItems.map((item) => (
              <Tag key={item}>
                {item}
                <Close onClick={() => handleRemove(item)} />
              </Tag>
            ))}
        </TagList>
      </div>

      {show && (
        <Modal ref={ref}>
          <List>
            {options.map((option) => (
              <ListItem
                key={option}
                active={selectedItems.includes(option)}
                onClick={() => handleClick(option)}
              >
                {option}
              </ListItem>
            ))}
          </List>
        </Modal>
      )}
    </Container>
  );
};

export default Select;
