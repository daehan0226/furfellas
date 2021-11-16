import styled from "styled-components";
import CardBody from "./CardBody";
import CardHead from "./CardHead";

const Container = styled.div`
  width: 320px;
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.primary.white};
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
`;


const Card = ({ data }) => {
  return (
    <Container>
      {data && data.name && (
        <>
          <CardHead title={data.name} />
          <CardBody data={data} />
        </>
      )}
    </Container>
  );
};

export default Card;
