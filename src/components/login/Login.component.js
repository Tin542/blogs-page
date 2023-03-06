import { Link } from "react-router-dom";
import signinbg from "../../assets/images/img-signin.gif";
import { Layout, Spin, Button, Row, Col, Typography, Form, Input } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import google from "../../assets/images/Google__G__Logo.svg.png";
import { PATH } from "../../constants/path/Path";
import React, { useState, useEffect } from "react";
import FooterComponent from '../common/FooterComponent';

const LoginComponent = (props) => {
  const { onFinish, signInWithGoogle, loading } = props;

  const { Title, Text } = Typography;
  const { Header, Footer, Content } = Layout;

  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  );

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Diary Blogs</h5>
          </div>
          <div className="header-col header-nav"></div>
          <div className="header-col header-btn"></div>
        </Header>
        <Content className="signin">
          <Spin indicator={loadingIcon} size="large" spinning={loading}>
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}>
                <Title className="mb-15">Login</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your email and password to login
                </Title>
                <Form onFinish={onFinish} layout="vertical" className="row-col">
                  <Form.Item
                    className="email"
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                    ]}>
                    <Input placeholder="Email" prefix={<MailOutlined />} />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}>
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}>
                      Login
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      style={{ width: "100%", cursor: "pointer" }}
                      onClick={() => signInWithGoogle()}>
                      <img src={google} alt="google" width={20} /> Login with
                      Google
                    </Button>
                  </Form.Item>
                  <p className="font-semibold text-muted">
                    Forgot password?{" "}
                    <Link to={PATH.RESET} className="text-dark font-bold">
                      Reset password
                    </Link>
                  </p>
                  <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to={PATH.REGISTER} className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}>
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Spin>
        </Content>
        <hr/>
        <Footer>
          <FooterComponent/>
        </Footer>
      </Layout>
    </>
  );
};

export default LoginComponent;
