import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import {Button} from "../common";


const Container = styled.div`
`;

const ItemBox = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
`

const Input = styled.input`
  width: 200px;
`
const Text = styled.p`
  width: 200px;
`

const ActionForm = ({data}) => {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  
  useEffect(()=>{
    if (data) {
      setValue(data.name)
    } else {
      setEdit(true);
    }
  }, [])

  const handleSubmit = () => {
    console.log(data)

    setEdit(false);
  }

  return (
    <Container>
        {edit ? (
          <ItemBox>
            <Input value={value} onChange={e=>setValue(e.target.value)} /> 
            <Button text={data ? "Update" : "Add"} onClick={handleSubmit} />
          </ItemBox>
        ) : (
          <ItemBox>
            <Text>{value}</Text>
            <Button text={"Edit"} onClick={()=>{setEdit(true)}} />
          </ItemBox>
        )}
          
          
    </Container>
  );
};

export default ActionForm;
