import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Image,
  Divider,
  List,
  Skeleton,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";
import { User } from "../../data/data";

const HomeComponent = (props) => {
  const { data } = props;
  const { Title } = Typography;

  const [loading, setLoading] = useState(false);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
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
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Friends</h6>}>
            <InfiniteScroll
              dataLength={User.length}
              next={false}
              hasMore={User.length < 50}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv">
              <List
                dataSource={User}
                renderItem={(item) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href="#">{item.username}</a>}
                      description={item.email}
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default HomeComponent;
