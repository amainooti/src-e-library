import React from "react";
import { useRouter } from "next/router";
import ResetPassword from "../../components/AuthForms/ResetPassword";
import AuthLayout from "../../components/Layouts/AuthLayout";

const Login = () => {
  const router = useRouter();
  const { id, token } = router.query;

  return (
    <AuthLayout>
      <ResetPassword userId={id} token={token} />
    </AuthLayout>
  );
};

export default Login;
