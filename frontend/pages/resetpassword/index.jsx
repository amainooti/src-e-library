import React from "react";
import { useRouter } from "next/router";
import ResetPassword from "../../components/AuthForms/ResetPassword";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const { id, token } = router.query;

  return (
    <AuthLayout>
      <Head>
        <title>Reset Password | SRC E-LIBRARY</title>
      </Head>
      <ResetPassword userId={id} token={token} />
    </AuthLayout>
  );
};

export default Login;
