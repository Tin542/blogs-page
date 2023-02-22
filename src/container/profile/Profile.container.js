import React, { useState } from "react";
import ProfileComponent from "../../components/profile/Profile.component";
import ModalCreatePost from "../../components/profile/modalCreatePost/ModalCreatePost.component";
import ModalUpdateProfileComponent from "../../components/profile/modalUpdateProfile/ModalUpdateprofile.component";
import ModalUpdateAvatarComponent from "../../components/profile/modalUpdatePhoto/ModalUpdateAvatar.component";
import ModalUpdateBGComponent from "../../components/profile/modalUpdatePhoto/ModalUpdateBG.component";
import { Post } from "../../data/post";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux-flow/selector";

const ProfileContainer = () => {
  const user = useSelector(userSelector);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
  const [modalUpdateAvatar, setMOdalUpdateAvatar] = useState(false);
  const [modalUpdateBG, setModalUpdateBG] = useState(false);

  return (
    <>
      <ProfileComponent
        user={user}
        data={Post}
        setModalCreate={setModalCreate}
        setModal={setModalUpdateProfile}
        setMOdalUpdateAvatar={setMOdalUpdateAvatar}
        setModalUpdateBG={setModalUpdateBG}
      />
      {modalCreate ? (
        <ModalCreatePost
          isModalOpen={modalCreate}
          setModalCreate={setModalCreate}
        />
      ) : (
        ""
      )}
      {modalUpdateProfile ? (
        <ModalUpdateProfileComponent
          isModalOpen={modalUpdateProfile}
          setModal={setModalUpdateProfile}
        />
      ) : (
        ""
      )}
      {modalUpdateAvatar ? (
        <ModalUpdateAvatarComponent
          isModalOpen={modalUpdateAvatar}
          setModal={setMOdalUpdateAvatar}
        />
      ) : (
        ""
      )}
      {modalUpdateBG ? (
        <ModalUpdateBGComponent
          isModalOpen={modalUpdateBG}
          setModal={setModalUpdateBG}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default ProfileContainer;
