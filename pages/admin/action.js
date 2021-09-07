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
  const { data } = useAction();

  return (
    <Container>
      <ActionForm />
      {data.length > 0 &&
        data.map((action) => <ActionForm key={action.id} data={action} />)}
    </Container>
  );
}
