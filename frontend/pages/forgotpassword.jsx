import React from "react";
import ForgotPasswordForm from "../components/AuthForms/ForgotPassword";

import AuthLayout from "../components/Layouts/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
