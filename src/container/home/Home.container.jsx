import React, { useEffect, useState } from "react";
import HomeComponent from "../../components/home/Home.component";
import ModalCreatePostComponent from "../../components/profile/modalCreatePost/ModalCreatePost.component";
import { Post } from "../../data/post";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

const HomeContainer = () => {
  const [modalCreate, setModalCreate] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPost();
  }, [loading]);

  const getPost = async () => {
    let listPost = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      listPost.push(doc.data());
    });
    setData(listPost);
    setLoading(false);
  };
  return (
    <>
      <HomeComponent loading={loading} data={data} setModalCreate={setModalCreate}/>
      {modalCreate ? (
        <ModalCreatePostComponent
          isModalOpen={modalCreate}
          setModalCreate={setModalCreate}
          setLoading={setLoading}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default HomeContainer;
