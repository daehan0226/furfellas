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
  const { locations } = useLocation();

  return (
    <Container>
      <LocationForm />
      {locations.length > 0 &&
        locations.map((location) => (
          <LocationForm key={location.id} data={location} />
        ))}
    </Container>
  );
}
