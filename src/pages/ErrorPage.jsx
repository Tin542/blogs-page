import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          onClick={() => {
            navigate('/home');
          }}
          type="primary">
          Back Home
        </Button>
      }
    />
  );
};
export default ErrorPage;
