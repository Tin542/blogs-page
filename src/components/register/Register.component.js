import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Spin,
  Divider,
  Col,
  Select,
  Row,
} from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  confirm,
  email,
  fullname,
  password,
  phone,
  username,
} from "../../validate/RegisterValidate";
import FooterComponent from "../common/FooterComponent";
import FloatLabelInput from "../common/floatingLabelInput/FloatingLabelInput.component";
import MarkdownEditorComponent from "../common/markdown/MarkdownEditor";
import MarkdownViewComponent from "../common/markdown/MarkdownView";
import UploadImageContainer from "../common/UploadImage/UploadImage.container";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const RegisterComponent = (props) => {
  const {
    onFinish,
    setSumary,
    sumary,
    setPhoto,
    photo,
    setBackground,
    background,
  } = props;

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
            <h5>Diary Blogs</h5>
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
                  Use these awesome forms to create new account in your project
                  for free.
                </p>
              </div>
            </div>

            <Card
              className="card-registration header-solid h-full ant-card pt-0"
              title={<h5>Sign Up</h5>}
              bordered="false">
              <p className="text-center my-25 font-semibold text-muted"></p>
              <Form name="basic" onFinish={onFinish} className="row-col">
                <Row gutter={[20, 20]}>
                  <Col flex={2}>
                    <Form.Item name="name" rules={fullname}>
                      <FloatLabelInput
                        type="text"
                        label="Full Name"
                        placeholder="Full name"
                      />
                    </Form.Item>

                    <Form.Item name="email">
                      <FloatLabelInput
                        type="email"
                        label="Email"
                        placeholder="email"
                      />
                    </Form.Item>
                    <Form.Item name="username" rules={username}>
                      <FloatLabelInput
                        type="text"
                        label="Username"
                        placeholder="Username"
                      />
                    </Form.Item>
                    <Form.Item name="password" rules={password}>
                      <FloatLabelInput
                        type="password"
                        label="Password"
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Form.Item name="Repassword" rules={confirm}>
                      <FloatLabelInput
                        type="password"
                        label="RePassword"
                        placeholder="RePassword"
                      />
                    </Form.Item>
                    <Form.Item name="phone" rules={phone}>
                      <FloatLabelInput
                        label="Phone number"
                        type="number"
                        placeholder="Phone number"
                      />
                    </Form.Item>
                    <Form.Item name="gender">
                      <Select
                        showSearch
                        placeholder="Select your gender"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "Male",
                            label: "Male",
                          },
                          {
                            value: "Female",
                            label: "Female",
                          },
                          {
                            value: "Other",
                            label: "Other",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col flex={3}>
                    <Form.Item name="dateOfBirth">
                      <FloatLabelInput type="date" label="Date Of Birth" />
                    </Form.Item>
                    <Divider>Summary</Divider>
                    <Form.Item name="sumary">
                      <MarkdownEditorComponent
                        value={sumary}
                        setValue={setSumary}
                      />
                      <MarkdownViewComponent value={sumary} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[20, 20]}>
                  <Divider>Photo/Background</Divider>
                  <Col flex={3}>
                    Avatar
                    <Form.Item name="photo">
                      <UploadImageContainer file={photo} setFile={setPhoto} />
                    </Form.Item>
                  </Col>
                  <Col flex={3}>
                    Background
                    <Form.Item name="background">
                      <UploadImageContainer
                        file={background}
                        setFile={setBackground}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit">
                    SUBMIT
                  </Button>
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                Already have an account ?
                <Link to="/" className="text-dark">
                  {" "}
                  Login
                </Link>
              </p>
            </Card>
          </Spin>
        </Content>
        <Footer>
          <FooterComponent />
        </Footer>
      </div>
    </>
  );
};

export default RegisterComponent;
