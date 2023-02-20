const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex =
  /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

export const email = [
  {
    required: true,
    message: "Please input your email!",
  },
  {
    pattern: new RegExp(emailRegex),
    message: "Email is invalid!",
  },
];

export const username = [
  {
    required: true,
    message: 'Please input your Username!'
  }
];

export const fullname = [
  {
    required: true,
    message: 'Please input your full name!'
  }
];

export const password = [
  {
    required: true,
    message: 'Please input your new Password!'
  }
];

export const confirm = [
  {
    required: true,
    message: 'Please confirm your password!'
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) return Promise.resolve();

      return Promise.reject(new Error('Password not matched!'));
    }
  })
];

export const phone = [
  {
    required: true,
    message: 'Please enter your phone number!'
  },
  {
    pattern: new RegExp(phoneRegex),
    message: 'Phone number invalid!'
  }
];
