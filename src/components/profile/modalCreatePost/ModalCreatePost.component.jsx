import React, { useState } from "react";
import {
  Button,
  Modal,
  Layout,
  Avatar,
  Typography,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import MarkdownEditorComponent from "../../common/markdown/MarkdownEditor";
import UploadImage from "../../common/UploadImage/UploadImage.container";
import { userSelector } from "../../../redux-flow/selector";
import { useDispatch, useSelector } from "react-redux";
import { handleAddPost } from "../../../redux-flow/action";
import {CREATE_POST_FAILED} from '../../../constants/error/Errors';

const ModalCreatePostComponent = (props) => {
  const { isModalOpen, setModalCreate, setLoading } = props;
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const [detail, setDetail] = useState("What are you thinking ?");
  const [imgURL, setImgURL] = useState("");
  var myCurrentDate = new Date();
  var date =
    myCurrentDate.getDate() +
    "/" +
    myCurrentDate.getMonth() +
    "/" +
    myCurrentDate.getFullYear();

  const currentUser = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setModalCreate(false);
  };

  const handleCreate = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        uid: currentUser.uid,
        author: currentUser.username,
        avatar: currentUser.photo,
        date: date,
        detail: detail,
        image: imgURL,
      });

      dispatch(
        handleAddPost({
          uid: currentUser.uid,
          author: currentUser.username,
          avatar: currentUser.photo,
          date: date,
          detail: detail,
          image: imgURL,
        })
      );
      message.success("Create Post successfully");
      setModalCreate(false);
      setLoading(true);
    } catch (error) {
      message.error(CREATE_POST_FAILED);
      console.log(error);
    }
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
                src={currentUser.photo}></Avatar>
              <div className="avatar-info">
                <Title level={5}>{currentUser.name}</Title>
                <p>{currentUser.username}</p>
              </div>
            </Avatar.Group>{" "}
            <MarkdownEditorComponent value={detail} setValue={setDetail} />
            <Divider>Image</Divider>
            <Row gutter={[5, 5]}>
              <Col>
                <UploadImage file={imgURL} setFile={setImgURL} />
              </Col>
            </Row>
            <Divider />
            <Button onClick={handleCreate} type="primary" block>
              Create
            </Button>
          </Content>
        </Layout>
      </Modal>
    </>
  );
};
export default ModalCreatePostComponent;
