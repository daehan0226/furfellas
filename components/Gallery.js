import { useState, useEffect } from "react";
import styled from "styled-components";
import useSelect from "../hooks/useSelect";
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
  const tyleSelect = useSelect("who", SelectOptions.type);
  const actionSelect = useSelect("what", SelectOptions.action);
  const sortSelect = useSelect("sort", SelectOptions.sort);

  return (
    <Section>
      <Title>Gallery</Title>
      <Container>
        <SelectWrap>
          <Select {...tyleSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...actionSelect} />
        </SelectWrap>
        <SelectWrap>
          <Select {...sortSelect} multipleChoices={false} />
        </SelectWrap>
      </Container>
      <ImageContainer></ImageContainer>
    </Section>
  );
};

export default Gallery;
