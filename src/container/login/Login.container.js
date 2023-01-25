import React from "react";
import LoginComponent from "../../components/login/Login.component";
import { LoginNotification } from "../../notifications/LoginNotification";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path/Path";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import {
  auth,
  db
} from "../../firebase/FirebaseConfig";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginContainer = () => {
  
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(PATH.HOME);
    } catch (err) {
      LoginNotification("error");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      console.log('user: ', user);
      navigate(PATH.HOME);

      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      LoginNotification("error");
    }
  };

  const onFinish = (data) => {
    logInWithEmailAndPassword(data.email, data.password);
  };


  return (
    <>
      <LoginComponent onFinish={onFinish} signInWithGoogle={signInWithGoogle} />
    </>
  );
};
export default LoginContainer;
