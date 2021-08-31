import Image from 'next/image';
import styled from "styled-components";

const Container = styled.div`

`;

const Text = styled.h5`
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`

const CardBody = ({ data }) => {
  return (
    <Container>
      <Text>Brithday : {data.birthdate}</Text>
      <Text>Color : {data.color}</Text>
      <Wrapper>
        {data.personality.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </Wrapper>
      <Text>{data.weight}kg</Text>
      <Image src={data.profilePic} alt={`${data.name}'s photo`} />
    </Container>
  );
};

export default CardBody;
