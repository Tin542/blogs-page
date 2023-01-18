import { notification } from "antd";
import { DUPLICATE_EMAIL } from "../constants/error/Errors";

export const RegisterNotification = (status, input) => {
  if (status === "success") {
    notification.success({
      message: "Register Successfully",
      duration: 2,
      description: "Moving to Login Page...",
    });
  } else if (status === "error") {
    
    if (input.includes("email-already-in-use")) {
      input = DUPLICATE_EMAIL;
    }

    notification.error({
      message: "Register Failed !!",
      description: `${input}`,
      duration: 3,
    });
  }
};
