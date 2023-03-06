import {
  Row,
  Col,
  Card,
  Avatar,
  Divider,
  List,
  Affix,
  Button,
  Skeleton,
  Spin,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import PostCard from "./postCard/PostCard.component";
import { User } from "../../data/data";

const HomeComponent = (props) => {
  const { data, setModalCreate, loading } = props;

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Spin spinning={loading}>
            <Row gutter={[24, 10]}>
              <Button
                onClick={() => {
                  setModalCreate(true);
                }}
                type="text"
                block
                style={{ borderRadius: "20px" }}>
                What are you thinking ?
              </Button>

              {data.map((i, index) => (
                <PostCard
                  username={i.author}
                  avatar={i.avatar}
                  image={i.image}
                  detail={i.detail}
                  time={i.date}
                />
              ))}
            </Row>
          </Spin>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Affix offsetTop={10}>
            <Card
              bordered={false}
              bodyStyle={{ paddingTop: 0 }}
              className="header-solid h-full  ant-list-yes"
              title={<h6 className="font-semibold m-0">Other people</h6>}>
              <InfiniteScroll
                dataLength={User.length}
                next={User}
                hasMore={User.length < 1}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
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
