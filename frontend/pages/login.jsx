import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userAtom";
import LoginForm from "../components/AuthForms/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const Login = () => {
  const router = useRouter();
  const loginState = useRecoilValue(userState);
  if (loginState.loggedIn) {
    router.push("/");
  }
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
