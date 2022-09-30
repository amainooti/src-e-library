import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userAtom";
import LoginForm from "../components/AuthForms/LoginForm";
import AuthLayout from "../components/Layouts/AuthLayout";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const loginState = useRecoilValue(userState);
  if (loginState.loggedIn) {
    router.push("/");
  }
  return (
    <AuthLayout>
      <Head>
        <title>Login | SRC E-LIBRARY</title>
      </Head>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
