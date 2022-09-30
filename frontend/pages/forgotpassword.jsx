import Head from "next/head";
import React from "react";
import ForgotPasswordForm from "../components/AuthForms/ForgotPassword";

import AuthLayout from "../components/Layouts/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Forgot Password | SRC E-LIBRARY</title>
      </Head>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
