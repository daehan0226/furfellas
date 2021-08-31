import styled from "styled-components";
const Title = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin: 10px 0px;
  ${(props) => props.theme.media.desktop`
    font-size: 30px;
  `}
  ${(props) => props.theme.media.tablet`
    font-size: 25px;
  `}
  ${(props) => props.theme.media.phone`
    font-size: 20px;
  `}
`;

const CardHead = ({ title }) => {
  return <Title>{title}</Title>;
};

export default CardHead;
