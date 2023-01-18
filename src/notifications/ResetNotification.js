import { notification } from "antd";
import { EMAIL_NOT_FOUND } from "../constants/error/Errors";

export const ResetNotification = (status, input) => {
  if (status === "success") {
    notification.success({
      message: "Success",
      duration: 2,
      description: "Password reset link sent. PLease check your email.",
    });
  } else if (status === "error") {
    
    if (input.includes("user-not-found")) {
      input = EMAIL_NOT_FOUND;
    }

    notification.error({
      message: "Reset Failed !!",
      description: `${input}`,
      duration: 3,
    });
  }
};
