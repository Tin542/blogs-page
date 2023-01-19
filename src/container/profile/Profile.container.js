import React, { useState } from "react";
import ProfileComponent from "../../components/profile/Profile.component";
import ModalCreatePost from "../../components/profile/modalCreatePost/ModalCreatePost.component";
import { Post } from "../../data/post";

const ProfileContainer = () => {
  const [modalCreate, setModalCreate] = useState(false);
  return (
    <>
      <ProfileComponent data={Post} setModalCreate={setModalCreate} />
      {modalCreate ? <ModalCreatePost isModalOpen={modalCreate} setModalCreate={setModalCreate} /> : ""}
    </>
  );
};
export default ProfileContainer;
