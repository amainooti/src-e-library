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
import { userLoginState } from "../../atoms/loginAtom";
import userState from "../../atoms/userAtom";

function Header(props) {
  const user = useRecoilValue(userState);
  const [modal, setModal] = useRecoilState(loginModalState);

  const isLoggedIn = useRecoilValue(userLoginState);
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
          background: "transparent",
          color: "secondary.main",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <a>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: "flex" }}
              >
                <Image
                  src="/assets/src-cropped.jpeg"
                  alt="SRC LOGO"
                  width={60}
                  height={60}
                  responsive="true"
                />
              </Typography>
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
