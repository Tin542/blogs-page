import React, { useState } from "react";
import {
  Button,
  Modal,
  Layout,
  Typography,
  Form,
  Divider,
  Select,
  Row,
  Col,
} from "antd";

import MarkdownEditorComponent from "../../common/markdown/MarkdownEditor";
import MarkdownViewComponent from "../../common/markdown/MarkdownView";
import FloatLabelInput from "../../common/floatingLabelInput/FloatingLabelInput.component";
import { fullname, phone, username } from "../../../validate/RegisterValidate";

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

const ModalUpdateProfileComponent = (props) => {
  const { isModalOpen, setModal } = props;
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sumary, setSumary] = useState(user.sumary);

  const handleCancel = () => {
    setModal(false);
  };

  const onFinish = async (data) => {
    data.sumary = sumary;

    const userNameDuplicated = query(
      collection(db, "users"),
      where("username", "==", data.username)
    );
    const checkUsername = await getDocs(userNameDuplicated);
    //check nếu username đã có trong firestore
    if (checkUsername.docs.length !== 0) {
      alert("username is already in use !");
    } else {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const findUsers = await getDocs(q);
      findUsers.forEach(async (user) => {
        const getUser = doc(db, "users", user.id);
        await updateDoc(getUser, {
          name: data.name,
          sumary: data.sumary,
          phone: data.phone,
          gender: data.gender,
          dob: data.dateOfBirth,
          username: data.username,
        });
      });
      dispatch(
        handleUpdateProfile({
          uid: user.uid,
          name: data.name,
          email: user.email,
          photo: user.photo,
          sumary: data.sumary,
          phone: data.phone,
          gender: data.gender,
          dob: data.dateOfBirth,
          background: user.background,
          username: data.username,
        })
      );
      alert("update completed");
      setModal(false);
      navigate(PATH.PROFILE);
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
            <Title level={5}>Update Infomations</Title>
          </Header>
          <Content style={{ textAlign: "left", background: "white" }}>
            <Form name="basic" onFinish={onFinish} className="row-col">
              <Form.Item name="name" initialValue={user.name} rules={fullname}>
                <FloatLabelInput
                  type="text"
                  label="Full Name"
                  placeholder="Full name"
                />
              </Form.Item>
              <Form.Item
                name="username"
                initialValue={user.username}
                rules={username}>
                <FloatLabelInput
                  type="text"
                  label="Username"
                  placeholder="Username"
                />
              </Form.Item>
              <Row gutter={[20, 20]}>
                <Col flex={2}>
                  <Form.Item name="gender" initialValue={user.gender}>
                    <Select
                      showSearch
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
                <Col flex={2}>
                  <Form.Item
                    name="phone"
                    rules={phone}
                    initialValue={user.phone}>
                    <FloatLabelInput
                      label="Phone number"
                      type="number"
                      placeholder="Phone number"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="dateOfBirth" initialValue={user.dob}>
                <FloatLabelInput type="date" label="Date Of Birth" />
              </Form.Item>

              <Form.Item name="sumary">
                <MarkdownEditorComponent value={sumary} setValue={setSumary} />
                <MarkdownViewComponent value={sumary} />
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
export default ModalUpdateProfileComponent;
