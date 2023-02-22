import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Affix,
  Divider,
  Typography,
  Image,
} from "antd";
import {
  VideoCameraOutlined,
  PictureOutlined,
  FlagOutlined,
  EditOutlined,
} from "@ant-design/icons";

import BgProfile from "../../assets/images/bg-profile.jpg";

const ProfileComponent = (props) => {
  const { data, setModalCreate, user, setModal, setMOdalUpdateAvatar, setModalUpdateBG } = props;
  const { Title } = Typography;

  let bgImage;

  if (user.background !== "") {
    bgImage = user.background;
  } else {
    bgImage = BgProfile;
  }

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}>
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"></path>
    </svg>,
  ];
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + bgImage + ")" }}></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={user.photo} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user.name}</h4>
                  <p>{user.username}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}>
              <Button onClick={()=>setMOdalUpdateAvatar(true)} icon={<EditOutlined />}>Edit Avatar</Button>
              <Button onClick={()=>setModalUpdateBG(true)} icon={<EditOutlined />}>Edit Background</Button>
            </Col>
          </Row>
        }></Card>
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Affix offsetTop={10}>
            <Card
              bordered={false}
              title={<h6 className="font-semibold m-0">Sumary</h6>}
              className="header-solid h-full card-profile-information"
              extra={
                <Button onClick={() => setModal(true)} type="link">
                  {pencil}
                </Button>
              }
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
              <p className="text-dark">{user.sumary}</p>
              <hr className="my-25" />
              <Descriptions title="Infomations">
                <Descriptions.Item label="Full Name" span={3}>
                  {user.name}
                </Descriptions.Item>
                <Descriptions.Item label="Date of birth" span={3}>
                  {user.dob}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile" span={3}>
                  {user.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Gender" span={3}>
                  {user.gender}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Affix>
        </Col>
        <Col span={24} md={16} className="mb-24 ">
          <Card>
            <Row>
              <Col span={24}>
                <Button
                  onClick={() => {
                    setModalCreate(true);
                  }}
                  type="text"
                  block
                  style={{ borderRadius: "20px" }}>
                  What are you thinking ?
                </Button>
              </Col>
            </Row>

            <Divider />
            <Row gutter={[5, 5]}>
              <Col span={8} style={{ "text-align": "center" }}>
                <Button
                  type="text"
                  block
                  icon={
                    <VideoCameraOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }>
                  Live
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
                        color: "blue",
                      }}
                    />
                  }>
                  Events
                </Button>
              </Col>
            </Row>
          </Card>

          <Row gutter={[24, 24]}>
            {data.map((i, index) => (
              <Col span={24} key={index}>
                <Card
                  className="header-solid h-full"
                  style={{
                    width: "100%",
                    marginTop: 16,
                  }}>
                  <Avatar.Group>
                    <Avatar
                      className="shape-avatar"
                      shape="square"
                      size={40}
                      src={i.user.avatar}></Avatar>
                    <div className="avatar-info">
                      <Title level={5}>{i.user.username}</Title>
                      <p>{i.time}</p>
                    </div>
                  </Avatar.Group>{" "}
                  <p>{i.detail}</p>
                  {i.image !== "" ? (
                    <Image height={400} width="100%" src={i.image} />
                  ) : (
                    ""
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default ProfileComponent;
