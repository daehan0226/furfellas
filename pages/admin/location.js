import { useEffect, useState } from "react";
import styled from "styled-components";

import { useFetch } from "../../hooks";
import { ActionForm } from "../../components/action";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  min-height: 80px;
  margin: 30px;
  ${FlexCenterBox}
  flex-direction: column;
`;

export default function Location() {
  const [fetchActions, doFfetchActions] = useFetch([]);

  useEffect(() => {
    doFfetchActions("actions/");
  }, []);

  return (
    <Container>
      <ActionForm />
      {fetchActions.data &&
        fetchActions.data.length > 0 &&
        fetchActions.data.map((action) => (
          <ActionForm key={action.id} data={action} />
        ))}
    </Container>
  );
}
