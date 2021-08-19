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

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-contents: flex-start;
  margin: 10px;
  background-color: ${({ theme }) => theme.colors.primary.text};
`;
const SelectWrap = styled.div`
  width: 120px;
`;

const SelectOptions = {
  type: ["Together", "Sevi", "Aibi"],
  action: ["Playing", "Sleeping", "Rubbing", "Eating", "Barking", "Laying"],
  sort: ["Ascending", "Descending"],
};

const Gallery = ({ images = null }) => {
  const [types, setTypes] = useState([]);
  const [actions, setActions] = useState([]);
  const [sort, setSort] = useState([]);

  useEffect(() => {
    console.log(types);
    console.log(actions);
  }, [types, actions]);

  return (
    <Section>
      <Title>Gallery</Title>
      <Container>
        <SelectWrap>
          <Select
            placeholder="Who?"
            options={SelectOptions.type}
            selectedItems={types}
            setSelectedItem={setTypes}
          />
        </SelectWrap>
        <SelectWrap>
          <Select
            placeholder="What?"
            options={SelectOptions.action}
            selectedItems={actions}
            setSelectedItem={setActions}
          />
        </SelectWrap>
        <SelectWrap>
          <Select
            placeholder="Sort"
            options={SelectOptions.sort}
            selectedItems={sort}
            setSelectedItem={setSort}
            multipleChoices={false}
          />
        </SelectWrap>
      </Container>
      <ImageContainer></ImageContainer>
    </Section>
  );
};

export default Gallery;
