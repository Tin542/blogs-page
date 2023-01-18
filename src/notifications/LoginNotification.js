import { notification } from 'antd';

export const LoginNotification = (status) => {
  if (status === 'success') {
    notification.success({
      message: 'Login Successfully',
    });
  } else if (status === 'error') {
    notification.error({
      message: 'Login Failed !!',
      description: `Email or password is incorrect !!`,
      duration: 3
    });
  }
};


