import React, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Typography,
  Card,
  Form,
  Col,
  Row,
  Spin,
  Divider,
  Select,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import FooterComponent from "../../../components/common/FooterComponent";
import {
  phone,
  username,
  fullname
} from "../../../validate/RegisterValidate";
import MarkdownEditorComponent from "../../../components/common/markdown/MarkdownEditor";
import FloatLabelInput from "../../../components/common/floatingLabelInput/FloatingLabelInput.component";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const RegisterComponent = (props) => {
  const { onFinish, user, sumary, setSumary } = props;

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
                <Title>Update Your Profile</Title>
                <p className="text-lg">
                  Look like this is the first time you're here. Let update your
                  infomation to make your profile more beautifull.
                </p>
              </div>
            </div>

            <Card
              className="card-registration header-solid h-full ant-card pt-0"
              title={<h5>Update Your Profile</h5>}
              bordered="false">
              <p className="text-center my-25 font-semibold text-muted"></p>
              <Form name="basic" onFinish={onFinish} className="row-col">
                <Row gutter={[20, 20]}>
                  <Col flex={2}>
                    <Form.Item name="name" initialValue={user.name} rules={fullname}>
                      <FloatLabelInput
                        type="text"
                        label="Full Name"
                        placeholder="Full name"
                      />
                    </Form.Item>

                    <Form.Item name="email" initialValue={user.email}>
                      <FloatLabelInput
                        type="email"
                        label="Email"
                        placeholder="email"
                        disabled
                      />
                    </Form.Item>
                    <Form.Item name="username" rules={username}>
                      <FloatLabelInput
                        type="text"
                        label="Username"
                        placeholder="Username"
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
                        size={'large'}
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
                <Link to="/home" className="text-dark">
                  Update later
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
