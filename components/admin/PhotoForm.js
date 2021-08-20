import { useState } from "react";
import styled from "styled-components";
import { Button, Select } from "../common";
import {useSelect} from "../../hooks"

const Container = styled.section`
    min-height: 400px;
`


const SelectOptions = {
    type: ["Together", "Sevi", "Aibi"],
    action: ["Playing", "Sleeping", "Rubbing", "Eating", "Barking", "Laying"],
    sort: ["Ascending", "Descending"],
  };

const PhotoForm = ({closeForm}) => {
  const tyleSelect = useSelect("who", SelectOptions.type);
  const actionSelect = useSelect("what", SelectOptions.action);
  const sortSelect = useSelect("sort", SelectOptions.sort);
    
    
    const handleSubmit = () => {
        closeForm()
    }
  
    return (
      <Container>
        <Select {...tyleSelect} />
        <Select {...actionSelect} />
        <Select {...sortSelect} multipleChoices={false} />
        <Button text={"Submit"} onClick={handleSubmit}/>
      </Container>
  );
};

export default PhotoForm;
