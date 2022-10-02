import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";

import Footer from "../Footer/Footer";
import ProfileMenu from "../Common/ProfileMenu";
import { loginModalState, profileShowState } from "../../atoms/profileAtom";

import userState from "../../atoms/userAtom";

function Header(props) {
  const user = useRecoilValue(userState);
  const [modal, setModal] = useRecoilState(loginModalState);

  const [showProfile, setShowProfile] = useRecoilState(profileShowState);

  const menuId = "primary-search-account-menu";

  React.useEffect(() => {
    if (user.loggedIn && modal) {
      setModal(false);
    }
  }, [modal, setModal, user.loggedIn]);

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "rgb(11, 111, 206)",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <a>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                  sx={{
                    height: "60px",
                    width: "60px",
                    alignItems: "center",
                    paddingRight: "5px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Image
                    src="/assets/src-cropped-removebg-preview.png"
                    alt="SRC LOGO"
                    width={60}
                    height={60}
                    // layout="responsive"
                  />
                </Box>
                <Typography
                  ml={1}
                  variant="h6"
                  display={{ xs: "none", md: "block" }}
                >
                  ABUAD SRC E-LIBRARY
                </Typography>
              </Box>
            </a>
          </Link>

          <Box sx={{ display: { md: "flex" } }}>
            {!user.loggedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => setModal((prev) => !prev)}
                color="inherit"
              >
                <Avatar />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => setShowProfile((prev) => !prev)}
                color="inherit"
              >
                <Avatar />
              </IconButton>
            )}
          </Box>
          {showProfile && <ProfileMenu />}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

const IndexLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default IndexLayout;
