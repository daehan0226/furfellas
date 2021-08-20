import { useEffect, useState } from "react";
import styled from "styled-components";

import { PhotoForm } from "../../components/admin";
import { Button } from "../../components/common";


const Container = styled.div`
  min-height: 80px;
  margin: 30px;
`


export default function Index() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Container>
      <Button
        text={showForm ? "Close the form" : "Add a new photo"}
        onClick={()=>setShowForm(!showForm)} />
      {showForm && <PhotoForm closeForm={()=>setShowForm(false)} />}    
        <p>
            List ( delete )
        </p>
    </Container>
  );
}
