import React from "react";
import RegisterComponent from "../../components/register/Register.component";
import { useNavigate } from "react-router-dom";
import { RegisterNotification } from "../../notifications/RegisterNotification";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";

import {PATH} from '../../constants/path/Path';

const RegisterContainer = () => {
  const navigagte = useNavigate();
  
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if(user !== undefined) {
        RegisterNotification('success');
        setTimeout(() => {
          navigagte(PATH.LOGIN);
        }, 3000);
      }
      
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email
      });

    } catch (err) {
      console.error(err);
      RegisterNotification("error", err.message);
    }
  };

  const onFinish = (data) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };
  return (
    <>
      <RegisterComponent onFinish={onFinish} />
    </>
  );
};
export default RegisterContainer;
