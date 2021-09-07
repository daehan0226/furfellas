import styled from "styled-components";

import { LocationForm } from "../../components/location";
import { FlexCenterBox } from "../../styles/common-styles";
import { useLocation } from "../../contexts";

const Container = styled.div`
  min-height: 80px;
  margin: 30px;
  ${FlexCenterBox}
  flex-direction: column;
`;

export default function Location() {
  const { data } = useLocation();

  return (
    <Container>
      <LocationForm />
      {data.length > 0 &&
        data.map((location) => (
          <LocationForm key={location.id} data={location} />
        ))}
    </Container>
  );
}
