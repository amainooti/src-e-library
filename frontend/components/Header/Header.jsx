import * as React from "react";
import PropTypes from "prop-types";
import ProfileMenu from "../Common/ProfileMenu";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import Link from "next/link";

import SearchBar from "../Common/Search";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginModalState, profileShowState } from "../../atoms/profileAtom";
import { userLoginState } from "../../atoms/loginAtom";

export default function Header(props) {
  const [showProfile, setShowProfile] = useRecoilState(profileShowState);
  const [modal, setModal] = useRecoilState(loginModalState);

  const isLoggedIn = useRecoilValue(userLoginState);

  const menuId = "primary-search-account-menu";

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
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
          <Box sx={{ flexGrow: { lg: 1, xs: 0 } }} />
          <SearchBar />
          <Box sx={{ flexGrow: { lg: 1 } }} />

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
                aria-controls={menuId}
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
