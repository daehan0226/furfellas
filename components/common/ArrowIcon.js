import styled from "styled-components";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Arrow = styled(ArrowDownwardIcon)`
  && {
    margin-bottom: 0px;
    margin-left: 6px;
    cursor: pointer;

    transition-duration: 0.4s;
    transition-property: transform;
    ${({ up }) =>
      up &&
      `transform: rotate(180deg);
    `};
  }
`;
const ArrowIcon = ({ up = true }) => {
  return <Arrow up={up}></Arrow>;
};

export default ArrowIcon;
