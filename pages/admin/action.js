import styled from "styled-components";

import { ActionForm } from "../../components/action";
import { FlexCenterBox } from "../../styles/common-styles";
import { useAction } from "../../contexts";

const Container = styled.div`
  min-height: 80px;
  margin: 30px;
  ${FlexCenterBox}
  flex-direction: column;
`;

export default function Action() {
  const { actions } = useAction();

  return (
    <Container>
      <ActionForm />
      {actions.length > 0 &&
        actions.map((action) => <ActionForm key={action.id} data={action} />)}
    </Container>
  );
}
