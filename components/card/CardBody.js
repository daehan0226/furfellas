import styled from "styled-components";
import { FlexCenterBox } from "../../styles/common-styles";
import { changeToDisplayStringDatetime } from "../../utils/utils";

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
  border-radius: 50%;
`;

const CardBody = ({ data }) => {
  return (
    <Container>
      <Text>Brithday : {changeToDisplayStringDatetime(data.birthday)}</Text>
      <Text>Weight : {data.weight}kg</Text>
      <Wrapper>
        <p>{data.intro}</p>
      </Wrapper>
      <ImageWrapper>
        <Image src={data.photo_url} alt={`${data.name}'s photo`} />
      </ImageWrapper>
    </Container>
  );
};

export default CardBody;
