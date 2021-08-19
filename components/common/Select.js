import { useState } from "react";
import styled from "styled-components";

const Title = styled.h4`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0px;
`;
const Container = styled.div`
  position: relative;
`;

const Modal = styled.div`
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
  pointer: cursor;

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

const Select = ({ placeholder, options, selectedItems, setSelectedItem }) => {
  const [show, setShow] = useState(false);
  const handleClick = (option) => {
    if (selectedItems.includes(option)) {
      setSelectedItem(selectedItems.filter((item) => item !== option));
    } else {
      setSelectedItem([...selectedItems, option]);
    }
  };

  return (
    <Container>
      <div>
        <Title>{placeholder}</Title>
        {selectedItems.lenght !== 0 &&
          selectedItems.map((item) => <p key={item}>{item}</p>)}
        <button onClick={() => setShow(!show)}>
          {show ? "close" : "open"}
        </button>
      </div>

      {show && (
        <Modal>
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
