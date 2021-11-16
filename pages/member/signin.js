import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from 'antd';

import { authenticate, reauthenticate } from "../../redux/actions/authActions";
import { FlexCenterBox } from "../../styles/common-styles";

const Container = styled.div`
  margin-top: 100px;
  min-width: 320px;
  ${FlexCenterBox}
`;

const Signin = ({ }) => {
  const [form] = Form.useForm();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.loggedIn && auth.is_admin === 1) {
      router.push("/admin")
    }
  }, [auth])

  useEffect(() => {
    dispatch(reauthenticate());
  }, []);


  const submit = async (name, password) => {
    dispatch(
      authenticate(
        {
          username: name,
          password: password,
        },
        () => router.push("/"),
        (err) => {
          form.setFields([
            {
              name: 'password',
              errors: [err],
            },
          ]);
        },
        () => { }
      )
    );
  };


  const onFinish = (values) => {
    submit(values.username, values.password)
  };

  return (
    <Container>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{ width: 320 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Signin;
