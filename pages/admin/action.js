import styled from "styled-components";

import { FlexCenterBox } from "../../styles/common-styles";
import { useAction } from "../../contexts";
import { BasicForm } from "../../components/form";

const Container = styled.div`
  min-height: 80px;
  margin: 30px;
  ${FlexCenterBox}
  flex-direction: column;
`;

export default function Action() {
  const { data, refreshActions } = useAction();

  return (
    <Container>
      <BasicForm resource="actions" refresh={refreshActions} />
      {data.length > 0 &&
        data.map((action) => (
          <BasicForm key={action.id} data={action} resource="actions" refresh={refreshActions} />
        ))}

    </Container>
  );
}
