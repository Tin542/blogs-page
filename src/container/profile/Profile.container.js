import React, { useState } from "react";
import ProfileComponent from "../../components/profile/Profile.component";
import ModalCreatePost from "../../components/profile/modalCreatePost/ModalCreatePost.component";
import ModalUpdateProfileComponent from "../../components/profile/modalUpdateProfile/ModalUpdateprofile.component";
import ModalUpdateAvatarComponent from "../../components/profile/modalUpdatePhoto/ModalUpdateAvatar.component";
import ModalUpdateBGComponent from "../../components/profile/modalUpdatePhoto/ModalUpdateBG.component";

import { useSelector } from "react-redux";
import { userSelector, postSelector } from "../../redux-flow/selector";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";
import { useEffect } from "react";

const ProfileContainer = () => {
  const user = useSelector(userSelector);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
  const [modalUpdateAvatar, setMOdalUpdateAvatar] = useState(false);
  const [modalUpdateBG, setModalUpdateBG] = useState(false);

  useEffect(() => {
    getPost();
  }, [loading]);
  const getPost = async () => {
    let listPost = [];
    const q = query(collection(db, "posts"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      listPost.push(doc.data());
    });

    setPosts(listPost);
    setLoading(false);
  };

  return (
    <>
      <ProfileComponent
        loading={loading}
        user={user}
        data={posts}
        setModalCreate={setModalCreate}
        setModal={setModalUpdateProfile}
        setMOdalUpdateAvatar={setMOdalUpdateAvatar}
        setModalUpdateBG={setModalUpdateBG}
      />
      {modalCreate ? (
        <ModalCreatePost
          isModalOpen={modalCreate}
          setModalCreate={setModalCreate}
          setLoading={setLoading}
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
