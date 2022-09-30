import Head from "next/head";
import React from "react";
import RegisterForm from "../components/AuthForms/RegisterForm";
import AuthLayout from "../components/Layouts/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Register | SRC E-LIBRARY</title>
      </Head>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
