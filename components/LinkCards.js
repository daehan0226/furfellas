import styled from "styled-components";
import Link from "next/link";
import { useAction, useLocation } from "../contexts";
import { FlexCenterBox } from "../styles/common-styles";

const Container = styled.div`
  width: 320px;
  background-color: ${({ theme }) => theme.colors.primary.text};
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
`;

const Content = styled.div`
  width: 280px;
  height: 60px;
  margin: 20px;
`;

const Text = styled.p`
  margin-bottom: 0px;
`;

const Head = styled.div`
  margin-bottom: 10px;
`;
const Main = styled.div`
  margin-left: 4px;
  ${FlexCenterBox}
  justify-content: space-around;
`;

const LinkCards = ({}) => {
  const action = useAction();
  const location = useLocation();

  const links = [
    {
      href: "/admin/photo",
      title: "Photo",
      data: [],
    },
    {
      href: "/admin/action",
      title: "Action",
      data: action.data,
    },
    {
      href: "/admin/location",
      title: "Location",
      data: location.data,
    },
  ];

  return (
    <Container>
      {links.map(({ href, title, data }) => (
        <Content key={href}>
          <Head>
            <Link href={href}>{title}</Link>
          </Head>
          <Main>
            <Text>
              {title} : {data.length}
            </Text>
            <Link href={href}>Edit</Link>
          </Main>
        </Content>
      ))}
    </Container>
  );
};

export default LinkCards;
