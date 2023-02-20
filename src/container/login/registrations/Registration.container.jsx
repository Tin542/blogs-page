import React, { useState } from "react";
import RegisterComponent from "./Registration.component";
import { useNavigate } from "react-router-dom";

import { collection, query, where, getDocs, updateDoc, doc} from "firebase/firestore";
import { db } from "../../../firebase/FirebaseConfig";
import { useDispatch } from "react-redux";
import { PATH } from "../../../constants/path/Path";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux-flow/selector";

import { handleLoginWithGoogle } from "../../../redux-flow/action";

const RegistrationContainer = () => {
  const navigagte = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [sumary, setSumary] = useState("Let type something about you =(^.^)= ");

  const onFinish = async (data) => {
    data.sumary = sumary;
    console.log("data updated: ", data);
    
    const userNameDuplicated = query(
      collection(db, "users"),
      where("username", "==", data.username)
    );
    const checkUsername = await getDocs(userNameDuplicated);
    //check nếu username đã có trong firestore
    if (checkUsername.docs.length !== 0) {
      alert("username is already in use !");
    }else {
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
          password: data.password,
          username: data.username
        });
      });

      dispatch(
        handleLoginWithGoogle({
          uid: user.uid,
          name: data.name,
          authProvider: "google",
          email: user.email,
          photo: user.photoURL,
          sumary: data.sumary,
          phone: data.phone,
          gender: data.gender,
          dob: data.dateOfBirth,
          background: '',
          username: data.username
          
        })
      );
      alert('update completed');
      navigagte(PATH.HOME);
    }
  };
  return (
    <>
      <RegisterComponent
        onFinish={onFinish}
        user={user}
        sumary={sumary}
        setSumary={setSumary}
      />
    </>
  );
};
export default RegistrationContainer;
