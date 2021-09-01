import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div``;

const Text = styled.h5`
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
`;

const ImageWrapper = styled.div`
  ${FlexCenterBox}
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const CardBody = ({ data }) => {
  return (
    <Container>
      <Text>Brithday : {data.birthdate}</Text>
      <Text>Color : {data.color}</Text>
      <Text>Weight : {data.weight}kg</Text>
      <Wrapper>
        {data.personality.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </Wrapper>
      <ImageWrapper>
        <Image
          src="https://drive.google.com/uc?export=view&id=1k4TnfBzTIF3uvC3DTgow8h05slUtd1ec"
          alt="image"
        />
        {/* <Image src={data.profilePic} alt={`${data.name}'s photo`} /> */}
      </ImageWrapper>
    </Container>
  );
};

export default CardBody;
