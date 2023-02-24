import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import { Card, Typography, Avatar, Image } from "antd";

const PostCard = (props) => {
  const { id, username, avatar, image, detail, time } = props;
  const { Title, Text } = Typography;

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
      <ShowMoreText
        /* Default options */
        lines={3}
        more={<b>Show more</b>}
        less={<b>Show less</b>}
        anchorClass="show-more-less-clickable"
        expanded={false}
        width={0}
        truncatedEndingComponent={"... "}>{detail}
      </ShowMoreText>
      {image !== "" ? <Image height={400} width="100%" src={image} /> : ""}
    </Card>
  );
};
export default PostCard;
