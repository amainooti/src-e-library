import Footer from "../Footer/Footer";
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
  useScrollTrigger,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";

import { useRecoilState, useRecoilValue } from "recoil";
import { openModal, loginState } from "../../atoms/loginAtom";

import MoreIcon from "@mui/icons-material/MoreVert";

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

function Header(props) {
  const [modal, setModal] = useRecoilState(openModal);

  const isLoggedIn = useRecoilValue(loginState);
  const [showProfile, setShowProfile] = React.useState(false);

  const menuId = "primary-search-account-menu";

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
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
      </ElevationScroll>
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
