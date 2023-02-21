import React from "react";
import RegisterComponent from "../../components/register/Register.component";
import { useNavigate } from "react-router-dom";
import { RegisterNotification } from "../../notifications/RegisterNotification";

import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";

import { PATH } from "../../constants/path/Path";
import { useState } from "react";

const RegisterContainer = () => {
  const navigagte = useNavigate();

  const [sumary, setSumary] = useState("Let type something about you =(^.^)= ");
  const [photo, setPhoto] = useState("");
  const [background, setBackground] = useState("");

  const registerWithEmailAndPassword = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = res.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: data.name,
        authProvider: "local",
        email: data.email,
        photo: data.photo,
        sumary: data.sumary,
        phone: data.phone,
        gender: data.gender,
        dob: data.dateOfBirth,
        background: data.background,
        username: data.username,
      });
      alert('Register completed');
      navigagte(PATH.LOGIN);
    } catch (err) {
      console.error(err);
      RegisterNotification("error", err.message);
    }
  };

  const onFinish = async (data) => {
    data.photo = photo;
    data.background = background;
    data.sumary = sumary;
    console.log("data", data);

    const userNameDuplicated = query(
      collection(db, "users"),
      where("username", "==", data.username)
    );
    const checkUsername = await getDocs(userNameDuplicated);
    if (checkUsername.docs.length !== 0 ){
      RegisterNotification('error', 'Username is already in use !');
    } else {
      registerWithEmailAndPassword(data);
    }
  };
  return (
    <>
      <RegisterComponent
        onFinish={onFinish}
        sumary={sumary}
        setSumary={setSumary}
        photo={photo}
        setPhoto={setPhoto}
        background={background}
        setBackground={setBackground}
      />
    </>
  );
};
export default RegisterContainer;
