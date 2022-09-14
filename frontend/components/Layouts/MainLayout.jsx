import React from "react";
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Drawer,
  AppBar,
  styled,
  InputBase,
  Stack,
  alpha,
  Tooltip,
  Button,
  Avatar,
  Paper,
  ClickAwayListener,
  Container,
} from "@mui/material";

import { Search, FavoriteBorderRounded } from "@mui/icons-material";
import ProfileMenu from "../Common/ProfileMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
