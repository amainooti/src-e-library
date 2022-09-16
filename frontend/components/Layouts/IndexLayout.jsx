import Footer from "../Footer/Footer";
import * as React from "react";
import ProfileMenu from "../Common/ProfileMenu";

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

import { useRecoilState, useRecoilValue } from "recoil";
import { loginModalState, profileShowState } from "../../atoms/profileAtom";
import { userLoginState } from "../../atoms/loginAtom";

function Header(props) {
  const [modal, setModal] = useRecoilState(loginModalState);

  const isLoggedIn = useRecoilValue(userLoginState);
  const [showProfile, setShowProfile] = useRecoilState(profileShowState);

  const menuId = "primary-search-account-menu";

  return (
    <React.Fragment>
      <AppBar
        sx={{
          background: "transparent",
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
                sx={{ display: { sm: "block" } }}
              >
                LOGO
              </Typography>
            </a>
          </Link>

          <Box sx={{ display: { md: "flex" } }}>
            {!isLoggedIn ? (
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
