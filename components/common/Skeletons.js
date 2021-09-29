import styled from "styled-components";


const Skeleton = styled.div`
  width: 240px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.11);
  -webkit-animation: animation-c7515d 1.5s ease-in-out 0.5s infinite;
  animation: animation-c7515d 1.5s ease-in-out 0.5s infinite;
`

const Skeletons = ({ }) => {
  return (
    <>
      { [...Array(3)].map((_, index) => <Skeleton key={index}/>) } 
    </>
  );
};

export default Skeletons;
