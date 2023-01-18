const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

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

export const password = [
    {
      required: true,
      message: "Please input your password!",
    },
    {
      pattern: new RegExp(passwordRegex),
      message: "Password containing at least 6 charaters, 1 number, 1 uppercase, 1 lowercase and dont conatin special charaters ! ",
    },
  ];
