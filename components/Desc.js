import styled from "styled-components";
import { Card } from "./card";
import { FlexCenterBox } from "../styles/common-styles";

const data = {
  sevi: {
    name: "Sevi",
    birthdate: "07. 22. 20",
    color: "Black tan",
    personality: ["Smart", "Energeric", "Chaos", "Sensitive"],
    weight: 15,
  },
  aibi: {
    name: "Aibi",
    birthdate: "07. 22. 20",
    color: "White",
    personality: ["Kind", "Fearful", "Huggy"],
    weight: 18,
  },
};

const Container = styled.div`
  ${FlexCenterBox}
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.primary.light};
`;

const Desc = () => {
  return (
    <Container>
      <Card data={data.sevi} />
      <Card data={data.aibi} />
    </Container>
  );
};

export default Desc;
