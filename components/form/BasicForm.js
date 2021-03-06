import { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { createResources, updateResources, deleteResources } from "../../utils";
import { Button } from "../common";

const Container = styled.div`
`;

const ItemBox = styled.div`
  ${FlexCenterBox}
  justify-content: flex-start;
`;

const Input = styled.input`
  width: 200px;
`;
const Text = styled.p`
  width: 200px;
  margin-right: auto;
`;

const BasicForm = ({ data, resource, refresh, setSearchKey }) => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name);
    } else {
      setEdit(true);
    }
  }, []);

  useEffect(() => {
    setSearchKey && setSearchKey(name);
  }, [name])

  const handleSubmit = () => {
    setErrMsg("")
    const successCallback = () => {
      if (data && data.id) {
        setEdit(false);
      } else {
        setName("");
      }
      refresh();
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
    const confirmAction = () => {
      if (window.confirm(`Do you really want to delete '${data.name}'?`)) {
        setErrMsg("")
        deleteResources({
          resource,
          id,
          successCallback: () => {
            refresh();
          },
          failCallback: () => {
            setErrMsg("Something went wrong - delete fail");
          },
        });
      }
    };
    confirmAction();

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

export default BasicForm;
