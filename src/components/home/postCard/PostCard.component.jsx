import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Image,
  Divider,
  Button,
  Space,
  Input,
} from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { User } from "../../../data/data";
import { Comments } from "../../../data/post";

const PostCard = (props) => {
  const { id, username, avatar, image, detail, like, time, commentCount } =
    props;
  const { Title, Text } = Typography;
  const { TextArea } = Input;
  const [showComments, setShowComments] = useState(false);
  const [listComment, setListComment] = useState([]);

  const onChangeWordCount = (e) => {
    console.log("Change:", e.target.value);
  };

  let listComments = (postID) => {
    let comments = [];
    for (let i in Comments) {
      if (Comments[i].post.id === postID) {
        comments.push(Comments[i]);
      }
    }
    setListComment(comments);
  };

  const handleShowComments = (id) => {
    // e.stopPropagation();
    listComments(id);
    setShowComments(true);
  };
  return (
    <Card
      className="header-solid h-full"
      style={{
        width: "100%",
        marginTop: 10,
      }}>
      <Avatar.Group>
        <Avatar
          className="shape-avatar"
          shape="square"
          size={40}
          src={avatar}></Avatar>
        <div className="avatar-info">
          <Title level={5}>{username}</Title>
          <p>{time}</p>
        </div>
      </Avatar.Group>{" "}
      <p>{detail}</p>
      {image !== "" ? <Image height={400} width="100%" src={image} /> : ""}
      <Row justify="start" style={{ marginTop: "15px" }}>
        <Col span={8}>
          <Text type="secondary">{like} likes</Text>
        </Col>
        <Col span={8} offset={8} style={{ textAlign: "left" }}>
          <Space size={50}>
            <Text type="secondary">{commentCount} comments</Text>
            <Text type="secondary">5 shared</Text>
          </Space>
        </Col>
      </Row>
      <Divider style={{ margin: "10px" }} />
      <Row justify="space-around" align="middle">
        <Col span={8}>
          <Button
            type="text"
            block
            icon={
              <LikeOutlined
                style={{
                  color: "blue",
                }}
              />
            }>
            Like
          </Button>
        </Col>
        <Col span={8}>
          <Button
            onClick={() => {
              handleShowComments(id);
            }}
            type="text"
            block
            icon={
              <CommentOutlined
                style={{
                  color: "green",
                }}
              />
            }>
            Comments
          </Button>
        </Col>
        <Col span={8}>
          <Button
            type="text"
            block
            icon={
              <ShareAltOutlined
                style={{
                  color: "cyan",
                }}
              />
            }>
            Share
          </Button>
        </Col>
      </Row>
      {showComments ? (
        <>
          <Divider style={{ margin: "10px" }} />
          <Row align="top" style={{ marginBottom: "10px" }}>
            <Avatar.Group>
              <Avatar
                className="shape-avatar"
                shape="circle"
                size={30}
                src={User[0].avatar}></Avatar>
              <div className="avatar-info">
                <Card
                  style={{
                    width: "500px",
                    height: "auto",
                  }}>
                  <TextArea
                    placeholder="What do you think about this post ?"
                    autoSize
                    showCount
                    maxLength={500}
                    onChange={onChangeWordCount}
                  />
                </Card>
              </div>
            </Avatar.Group>{" "}
          </Row>
          {listComment.map((item) => (
            <Row align="top" style={{ marginBottom: "10px" }}>
              <Avatar.Group>
                <Avatar
                  className="shape-avatar"
                  shape="circle"
                  size={30}
                  src={item.user.avatar}></Avatar>
                <div className="avatar-info">
                  <Card
                    style={{
                      Width: "auto",
                      height: "auto",
                    }}>
                    <Title level={5}>{item.user.username}</Title>

                    <p
                      style={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        maxWidth: "600px",
                      }}>
                      {item.detail}
                    </p>
                  </Card>
                </div>
              </Avatar.Group>
            </Row>
          ))}
        </>
      ) : (
        ""
      )}
    </Card>
  );
};
export default PostCard;
