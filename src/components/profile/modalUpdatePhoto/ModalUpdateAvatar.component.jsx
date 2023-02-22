import React, { useState } from "react";
import { Button, Modal, Layout, Typography, Form, Divider } from "antd";

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useDispatch } from "react-redux";
import { PATH } from "../../../constants/path/Path";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux-flow/selector";
import { handleUpdateProfile } from "../../../redux-flow/action";
import { useNavigate } from "react-router-dom";
import UploadImageContainer from '../../common/UploadImage/UploadImage.container';

const ModalUpdateAvatarComponent = (props) => {
  const { isModalOpen, setModal } = props;
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");

  const handleCancel = () => {
    setModal(false);
  };

  const onFinish = async (data) => {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const findUsers = await getDocs(q);
    findUsers.forEach(async (user) => {
      const getUser = doc(db, "users", user.id);
      await updateDoc(getUser, {
        photo: photo,
      });
    });
    dispatch(
      handleUpdateProfile({
        uid: user.uid,
        name: user.name,
        email: user.email,
        photo: photo,
        sumary: user.sumary,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob,
        background: user.background,
        username: user.username,
      })
    );
    alert("update completed");
    setModal(false);
    navigate(PATH.PROFILE);
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
            <Title level={5}>Upload new avatar</Title>
          </Header>
          <Content style={{ textAlign: "left", background: "white" }}>
            <Form name="basic" onFinish={onFinish} className="row-col">
              <Form.Item name="photo">
                <UploadImageContainer file={photo} setFile={setPhoto} />
              </Form.Item>
              <Divider />
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit">
                  SUBMIT
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Modal>
    </>
  );
};
export default ModalUpdateAvatarComponent;
