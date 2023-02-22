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
import { auth, db } from "../../firebase/FirebaseConfig";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { handleLoginWithGoogle } from "../../redux-flow/action";

const LoginContainer = () => {
  const navigate = useNavigate();
  // const [user, loading, error] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

  const dispatch = useDispatch();

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q); 
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // get user's data from firestore to store to redux
          const userQuery = doc.data();
          dispatch(
            handleLoginWithGoogle({
              uid: userQuery.uid,
              name: userQuery.name,
              authProvider: "google",
              email: userQuery.email,
              photo: userQuery.photo,
              sumary: userQuery.sumary,
              phone: userQuery.phone,
              gender: userQuery.gender,
              dob: userQuery.dob,
              background: userQuery.background,
              username: userQuery.username,
            })
          );
        });
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
      const docs = await getDocs(q);

      // check if user existed in db
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          photo: user.photoURL,
          sumary: "",
          phone: "",
          gender: "",
          dob: "",
          background: "",
          password: "",
          username: "",
        });
        dispatch(
          handleLoginWithGoogle({
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            photo: user.photoURL,
            sumary: "",
            phone: "",
            gender: "",
            dob: "",
            background: "",
            username: "",
          })
        );
        navigate(PATH.REGISTRATION);
      } else {
        const querySnapshot = await getDocs(q); 
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // get user's data from firestore to store to redux
          const userQuery = doc.data();
          dispatch(
            handleLoginWithGoogle({
              uid: userQuery.uid,
              name: userQuery.name,
              authProvider: "google",
              email: userQuery.email,
              photo: userQuery.photo,
              sumary: userQuery.sumary,
              phone: userQuery.phone,
              gender: userQuery.gender,
              dob: userQuery.dob,
              background: userQuery.background,
              username: userQuery.username,
            })
          );
        });
        navigate(PATH.HOME);
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
