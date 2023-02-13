import React, { useState } from "react";
import ProfileComponent from "../../components/profile/Profile.component";
import ModalCreatePost from "../../components/profile/modalCreatePost/ModalCreatePost.component";
import { Post } from "../../data/post";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux-flow/selector";

const ProfileContainer = () => {
  const user = useSelector(userSelector);
  console.log('user selector: ', user);
  const [modalCreate, setModalCreate] = useState(false);

  return (
    <>
      <ProfileComponent user={user} data={Post} setModalCreate={setModalCreate} />
      {modalCreate ? <ModalCreatePost isModalOpen={modalCreate} setModalCreate={setModalCreate} /> : ""}
    </>
  );
};
export default ProfileContainer;
