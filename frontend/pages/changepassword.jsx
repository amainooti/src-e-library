import React from "react";
import Head from "next/head";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import ChangePasswordForm from "../components/AuthForms/ChangePasswordForm";
import { Box } from "@mui/material";

const ChangePassword = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Change Password | SRC E-LIBRARY</title>
      </Head>

      <ChangePasswordForm />
    </AuthLayout>
  );
};

export default ChangePassword;
