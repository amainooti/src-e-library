import * as React from "react";
import PropTypes from "prop-types";
import ProfileMenu from "../Common/ProfileMenu";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar,
  useScrollTrigger,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";

import MoreIcon from "@mui/icons-material/MoreVert";
import SearchBar from "../Common/Search";
import { useRecoilState, useRecoilValue } from "recoil";
import { openModal, loginState, openProfile } from "../../atoms/loginAtom";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const [showProfile, setShowProfile] = useRecoilState(openProfile);
  const [modal, setModal] = useRecoilState(openModal);

  const isLoggedIn = useRecoilValue(loginState);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuId = "primary-search-account-menu";

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
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
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
