import styled from "styled-components";


const Skeleton = styled.span`
  width: 240px;
  height: 200px;
  display: block;
  background: linear-gradient(        
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0) 80%
  ),
  lightgray;
  background-repeat: repeat-y;        
  background-size: 50px 200px;        
  background-position: 0 0; 
  animation: shine 1s infinite;
  
  @keyframes shine {
    to {
      background-position: 100% 0, 0 0;
    }
  }
`

const Skeletons = ({ }) => {
  return (
    <>
      { [...Array(5)].map((_, index) => <Skeleton key={index}/>) } 
    </>
  );
};

export default Skeletons;
