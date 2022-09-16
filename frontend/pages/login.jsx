import React from "react";
import LoginForm from "../components/AuthForms/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
