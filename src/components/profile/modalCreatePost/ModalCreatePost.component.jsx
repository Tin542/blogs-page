import React, { useState } from "react";
import {
  Button,
  Modal,
  Layout,
  Avatar,
  Typography,
  Input,
  Row,
  Col,
  Divider,
} from "antd";
import { PictureOutlined, FlagOutlined, TagsOutlined } from "@ant-design/icons";
import profilavatar from "../../../assets/images/face-1.jpg";
import MarkdownEditorComponent from "../../common/markdown/MarkdownEditor";
import MarkdownViewComponent from "../../common/markdown/MarkdownView";

const ModalCreatePostComponent = (props) => {
  const { isModalOpen, setModalCreate } = props;
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const [detail, setDetail] = useState("");

  const handleOk = () => {
    setModalCreate(false);
  };
  const handleCancel = () => {
    setModalCreate(false);
  };

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <Layout>
          <Header
            style={{
              color: "black",
              background: "white",
              textAlign: "center",
            }}>
            <Title level={5}>Create New Post</Title>
          </Header>
          <Content style={{ textAlign: "left", background: "white" }}>
            <Avatar.Group>
              <Avatar
                className="shape-avatar"
                shape="square"
                size={40}
                src={profilavatar}></Avatar>
              <div className="avatar-info">
                <Title level={5}>Michael John</Title>
                <p>michael@mail.com</p>
              </div>
            </Avatar.Group>{" "}
            <MarkdownEditorComponent value={detail} setValue={setDetail} />
            <MarkdownViewComponent value={detail} />
            <Row gutter={[5, 5]}>
              <Col span={8} style={{ "text-align": "center" }}>
                <Button
                  type="text"
                  block
                  icon={
                    <TagsOutlined
                      style={{
                        color: "blue",
                      }}
                    />
                  }>
                  Tags person
                </Button>
              </Col>
              <Col span={8} style={{ "text-align": "center" }}>
                <Button
                  type="text"
                  block
                  icon={
                    <PictureOutlined
                      style={{
                        color: "green",
                      }}
                    />
                  }>
                  Image/Viedo
                </Button>
              </Col>
              <Col span={8} style={{ "text-align": "center" }}>
                <Button
                  type="text"
                  block
                  icon={
                    <FlagOutlined
                      style={{
                        color: "cyan",
                      }}
                    />
                  }>
                  Events
                </Button>
              </Col>
            </Row>
            <Divider />
            <Button type="primary" block>
              Create
            </Button>
          </Content>
        </Layout>
      </Modal>
    </>
  );
};
export default ModalCreatePostComponent;
