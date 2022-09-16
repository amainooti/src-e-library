import React from "react";
import { useTheme } from "@mui/material/styles";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Box, Modal } from "@mui/material";
import LoginForm from "../AuthForms/LoginForm";
import { useRecoilState } from "recoil";
import { loginModalState } from "../../atoms/profileAtom";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useRecoilState(loginModalState);

  return (
    <>
      <Header />
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Box
          sx={{
            width: { md: "500px", sm: "80%", xs: "100%" },
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LoginForm />
        </Box>
      </Modal>
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
