import { Row, Col, Card, Avatar, Divider, List, Affix } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import PostCard from "./postCard/PostCard.component";
import { User } from "../../data/data";
import { Comments } from "../../data/post";

let commentCount = (postID) => {
  let count = 0;
  for (let i in Comments) {
    if (Comments[i].post.id === postID) count++;
  }
  return count;
};

const HomeComponent = (props) => {
  const { data } = props;

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Row gutter={[24, 10]}>
            {data.map((i, index) => (
              <PostCard
                id={i.id}
                username={i.user.username}
                avatar={i.user.avatar}
                image={i.image}
                detail={i.detail}
                like={i.like}
                time={i.time}
                commentCount={commentCount(i.id)}
              />
            ))}
          </Row>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Affix offsetTop={10}>
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
          </Affix>
        </Col>
      </Row>
    </>
  );
};
export default HomeComponent;
