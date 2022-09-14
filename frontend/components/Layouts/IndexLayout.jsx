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

const SecondaryButton = (props) => {
  return (
    <Button
      variant={props.variant}
      size={props.size}
      disableElevation
      onClick={props.onClick}
      sx={{
        color: props.textColor ? props.textColor : "#00a889",
        fontWeight: "bold",
        background: "rgb(0,0,0,5%)",
        borderRadius: "1rem",
        textTransform: "none",
        fontFamily: "'Josefin Sans', sans-serif",
      }}
      fullWidth={props.fullWidth}
    >
      {props.children}
    </Button>
  );
};

const CustomButton = (props) => {
  return (
    <Button
      variant={props.variant}
      size={props.size}
      sx={{
        borderRadius: "1rem",
        textTransform: "none",
        fontFamily: "'Josefin Sans', sans-serif",
        width: props.width,
      }}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      color={props.color}
    >
      {props.children}
    </Button>
  );
};

const IndexLayout = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  return (
    <div>
      <Box p={2} mb={3} justifyContent="space-between" display="flex">
        <Typography>LOGO</Typography>

        <Stack spacing={2} direction="row">
          <Tooltip title="Profile" arrow>
            <>
              <SecondaryButton
                textColor="inherit"
                onClick={() => setShowProfile((prev) => !prev)}
              >
                <Typography mr={1}>Hi, User</Typography>
                <Avatar
                  sx={{
                    marginRight: "5px",
                  }}
                />
              </SecondaryButton>
            </>
          </Tooltip>
        </Stack>
      </Box>
      <Container maxWidth="xl">
        {showProfile && <Profile />}
        <Box>{children}</Box>
      </Container>
    </div>
  );
};

export default IndexLayout;
