import React from "react";
import ResetPasswordComponent from "../../components/resetPassword/ResetPassword.component";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path/Path";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth} from "../../firebase/FirebaseConfig";
import { ResetNotification } from "../../notifications/ResetNotification";

const ResetPasswordContainer = () => {
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      ResetNotification('success');
    } catch (err) {
      console.error(err);
      ResetNotification('error');
    }
  };
  const onFinish = (value) => {
    sendPasswordReset(value.email)
  };
  return (
    <>
      <ResetPasswordComponent onFinish={onFinish} />
    </>
  );
};
export default ResetPasswordContainer;
