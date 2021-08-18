import styled from "styled-components";
import CardBody from "./CardBody";
import CardHead from "./CardHead";

const CardContainer = styled.div`
  width: 320px;
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.primary.text};
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
`;

const Card = ({ data }) => {
  return (
    <CardContainer>
      <CardHead title={data.name} />
      <CardBody data={data} />
    </CardContainer>
  );
};

export default Card;
