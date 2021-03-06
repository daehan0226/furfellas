import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAction } from "../../contexts";
import { FlexCenterBox } from "../../styles/common-styles";
import { createResources, updateResources, deleteResources } from "../../utils";
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

const ActionForm = ({ data }) => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { refreshActions } = useAction();

  useEffect(() => {
    if (data) {
      setName(data.name);
    } else {
      setEdit(true);
    }
  }, []);

  const handleSubmit = () => {
    const resource = "actions";
    const successCallback = () => {
      if (data && data.id) {
        setEdit(false);
      } else {
        setName("");
      }
      refreshActions();
    };
    const failCallback = () => {
      setErrMsg("Something went wrong - create/update fail");
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

  const handleDelete = (id) => {
    deleteResources({
      resource: "actions",
      id,
      successCallback: () => {
        refreshActions();
      },
      failCallback: () => {
        setErrMsg("Something went wrong - delete fail");
      },
    });
  };

  return (
    <Container>
      {edit ? (
        <ItemBox>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Button text={data ? "Update" : "Add"} onClick={handleSubmit} />
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
          <Button
            text={"Delete"}
            onClick={() => {
              handleDelete(data.id);
            }}
          />
        </ItemBox>
      )}
      {errMsg && <p>{errMsg}</p>}
    </Container>
  );
};

export default ActionForm;
