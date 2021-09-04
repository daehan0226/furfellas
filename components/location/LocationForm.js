import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "../../contexts";
import { FlexCenterBox } from "../../styles/common-styles";
import { createResources, updateResources } from "../../utils";
import { Button } from "../common";

const Container = styled.div``;

const ItemBox = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
`;

const Input = styled.input`
  width: 200px;
`;
const Text = styled.p`
  width: 200px;
`;

const LocationForm = ({ data }) => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { refreshLocations } = useLocation();

  useEffect(() => {
    if (data) {
      setName(data.name);
    } else {
      setEdit(true);
    }
  }, []);

  const handleSubmit = () => {
    const resource = "locations";
    const successCallback = () => {
      if (data && data.id) {
        setEdit(false);
      } else {
        setName("");
      }
      refreshLocations();
    };
    const failCallback = () => {
      setErrMsg("Something went wrong");
    };

    const resourceApiCall = {
      resource,
      name,
      successCallback,
      failCallback,
    };

    if (data && data.id) {
      updateResources({ ...resourceApiCall, id: data.id });
    } else {
      createResources(resourceApiCall);
    }
  };

  return (
    <Container>
      {edit ? (
        <ItemBox>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Button text={data ? "Update" : "Add"} onClick={handleSubmit} />
          {errMsg && <p>{errMsg}</p>}
        </ItemBox>
      ) : (
        <ItemBox>
          <Text>{name}</Text>
          <Button
            text={"Edit"}
            onClick={() => {
              setEdit(true);
            }}
          />
        </ItemBox>
      )}
    </Container>
  );
};

export default LocationForm;
