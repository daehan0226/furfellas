import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FlexCenterBox } from "../styles/common-styles";

const Container = styled.div`
  ${FlexCenterBox}
  flex-direction: column;
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.text};
  margin-top: auto;
  ${({ admin }) =>
    admin &&
    `
    position: fixed;
    bottom: 0;
  `};
`;

const Spacer = styled.div`
  height: 60px;
`;

const LinkBox = styled.div`
  margin: 5px;
`


const Footer = () => {
  const router = useRouter();

  return (
    <>

      {router.pathname.includes('admin') && <Spacer />}
      <Container admin={router.pathname.includes('admin')}>
        <LinkBox>
          <Link href={"/member/signin"}>Admin</Link>
        </LinkBox>
        <LinkBox>
          {`©${new Date().getFullYear()} Copyright : `}
          <Link href={"/"}>furfellas.foxlee.kr</Link>
        </LinkBox>
      </Container>
    </>
  );
};

export default Footer;
