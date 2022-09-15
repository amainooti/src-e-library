import React from "react";
import { Box, styled } from "@mui/material";
import { useRouter } from "next/router";

const Main = styled(Box)(() => ({
  display: "flex",
  boxPack: "center",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
}));

const AuthLayout = ({ children }) => {
  const router = useRouter();

  // React.useEffect(() => {
  //   if (state.user) {
  //     router.push("/");
  //   }
  // }, [router, state.user]);

  return <Main>{children}</Main>;
};

export default AuthLayout;
