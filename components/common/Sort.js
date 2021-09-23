import styled from "styled-components";
import ArrowIcon from "./ArrowIcon";

const SortContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const Sort = ({ title, sort = "asc", setSort = () => {} }) => {
  return (
    <SortContainer>
      <h6>{title}</h6>
      <div onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}>
        <ArrowIcon up={sort === "asc"} />
      </div>
    </SortContainer>
  );
};

export default Sort;
