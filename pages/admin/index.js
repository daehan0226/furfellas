import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FlexCenterBox } from "../../styles/common-styles";
import { useAction, usePhotoType, useLocation } from "../../contexts";
import { BasicFormList } from "../../components/form";
import { PhotoFormList } from "../../components/photo";
import TodoTable from "../../components/admin/TodoTable";

const Container = styled.div`
  width: 100%;
  min-height: 80px;
  margin: 30px;
  ${FlexCenterBox}
  flex-direction: column;
`;


export default function Admin() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const actions = useAction();
  const locations = useLocation();
  const photoTypes = usePhotoType();

  useEffect(() => {
    if (auth.is_admin === 1) {
      router.push("/admin")
    } else {
      router.push("/member/signin")
    }
  }, [])

  return (
    <Container>
      <BasicFormList
        resource="actions"
        refresh={actions.refresh}
        items={actions.data}
      ></BasicFormList>
      <BasicFormList
        resource="locations"
        refresh={locations.refresh}
        items={locations.data}
      ></BasicFormList>
      <BasicFormList
        resource="photo-types"
        refresh={photoTypes.refresh}
        items={photoTypes.data}
      ></BasicFormList>
      <TodoTable />
      <PhotoFormList />
    </Container>
  );
}
