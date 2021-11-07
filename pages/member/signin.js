import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { authenticate, reauthenticate } from "../../redux/actions/authActions";
import { FlexCenterBox } from "../../styles/common-styles";
import { Button } from "../../components/common";

const Container = styled.div`
  margin-top: 100px;
  ${FlexCenterBox}
  flex-direction: column;
`;
const Span = styled.span`
  margin-bottom: 4px;
`;

const Input = styled.input`
  margin-bottom: 14px;
`;

const Signin = ({ }) => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (auth.loggedIn && auth.is_admin === 1) {
      router.push("/admin")
    }
  }, [auth])


  useEffect(() => {
    dispatch(reauthenticate());
  }, []);


  const handleSubmit = () => {
    setErr("")
    submit()
  };


  const submit = async () => {
    dispatch(
      authenticate(
        {
          username: name,
          password: password,
        },
        () => router.push("/"),
        (err) => { setErr(err) },
        () => { }
      )
    );
  };


  return (
    <Container>
      <Span>Username</Span>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Span>Password</Span>
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button text={"Admin Login"} onClick={handleSubmit} disabled={name === "" || password === ""} />
      <Span>{err}</Span>
    </Container>
  );
};

export default Signin;
