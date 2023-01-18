import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Spin,
} from "antd";

import {
  LoadingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { email, password } from "../../validate/RegisterValidate";
import FooterComponent from '../common/FooterComponent';

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const RegisterComponent = (props) => {
  const { onFinish } = props;

  const [loading, setLoading] = useState(true);
  const handleSpin = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  );
  useEffect(() => {
    handleSpin();
  });

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>My website</h5>
          </div>
          <div className="header-col header-nav"></div>
          <div className="header-col header-btn"></div>
        </Header>

        <Content className="p-0">
          <Spin indicator={loadingIcon} size="large" spinning={loading}>
            <div className="sign-up-header">
              <div className="content">
                <Title>Sign Up</Title>
                <p className="text-lg">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </div>
            </div>

            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              title={<h5>Register</h5>}
              bordered="false">
              <p className="text-center my-25 font-semibold text-muted"></p>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="row-col">
                <Form.Item
                  name="Name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}>
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item name="email" rules={email}>
                  <Input placeholder="email" />
                </Form.Item>
                <Form.Item name="password" rules={password}>
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>
                    I agree the{" "}
                    <a href="#pablo" className="font-bold text-dark">
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit">
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account?{" "}
                <Link to="/" className="font-bold text-dark">
                  Sign In
                </Link>
              </p>
            </Card>
          </Spin>
        </Content>
        <Footer>
          <FooterComponent/>
        </Footer>
      </div>
    </>
  );
};

export default RegisterComponent;
