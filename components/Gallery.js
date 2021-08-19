import { useState, useEffect } from "react";
import styled from "styled-components";
import { Select } from "./common";

const Section = styled.section`
  width: 100%;
  min-height: 400px;
  box-sizing: boder-box;
  margin: 0px 80px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const Title = styled.h2`
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: ${({ theme }) => theme.colors.primary.dark};
  ${(props) => props.theme.media.phone`
  text-align: center;
  `}
`;

const ImageContainer = styled.div`
  display: flex;
`;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-contents: flex-start;
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;

const SelectOptions = {
  type: ["Together", "Sevi", "Aibi"],
  action: ["Playing", "Sleeping", "Rubbing", "Eating", "Barking", "Laying"],
};

const Gallery = ({ images = null }) => {
  const [types, setTypes] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    console.log(types);
    console.log(actions);
  }, [types, actions]);

  return (
    <Section>
      <Title>Gallery</Title>
      <SelectContainer>
        <div>
          <Select
            placeholder="Who?"
            options={SelectOptions.type}
            selectedItems={types}
            setSelectedItem={setTypes}
          />
        </div>
        <div>
          <Select
            placeholder="What?"
            options={SelectOptions.action}
            selectedItems={actions}
            setSelectedItem={setActions}
          />
        </div>
      </SelectContainer>
      <ImageContainer></ImageContainer>
    </Section>
  );
};

export default Gallery;
