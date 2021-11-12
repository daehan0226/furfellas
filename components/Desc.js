import styled from "styled-components";
import { Card } from "./card";
import { FlexCenterBox } from "../styles/common-styles";

const data = {
  sevi: {
    name: "Sevi",
    birthdate: "07. 22. 20",
    color: "Black tan",
    personality: ["Smart", "Energetic", "Chaotic", "Sensitive"],
    weight: 16,
    profilePic: "/sevi.jpg",
  },
  aibi: {
    name: "Aibi",
    birthdate: "07. 22. 20",
    color: "White",
    personality: ["Kind", "Scaredy Cat", "Snuggly"],
    weight: 18,
    profilePic: "/aibi.jpg",
  },
};

const CardContainer = styled.div`
  ${FlexCenterBox}
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.primary.light};
`;

const Desc = () => {
  return (
    <CardContainer>
      <Card data={data.sevi} />
      <Card data={data.aibi} />
    </CardContainer>
  );
};

export default Desc;
