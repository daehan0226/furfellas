import { useState } from "react";
import styled from "styled-components";
import { Button } from "../common";

const Container = styled.section`
    min-height: 400px;
`

const PhotoForm = ({closeForm}) => {
    
    const handleSubmit = () => {
        closeForm()
    }
  
    return (
      <Container>
          <input />
          <input />
          <input />
          <input />
          <Button text={"Submit"} onClick={handleSubmit}/>
      </Container>
  );
};

export default PhotoForm;
