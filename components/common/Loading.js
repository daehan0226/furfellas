import styled from "styled-components";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";

const RenewIcon = styled(AutorenewOutlinedIcon)`
  animation: rotation 1s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

const Loading = () => {
  return <RenewIcon />;
};

export default Loading;
