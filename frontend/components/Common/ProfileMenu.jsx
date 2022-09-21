import { Favorite, Upload } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { userLoginState } from "../../atoms/loginAtom";
import { profileShowState } from "../../atoms/profileAtom";
import userState from "../../atoms/userAtom";

const Profile = () => {
  const user = useRecoilValue(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLoginState);
  const [showProfile, setShowProfile] = useRecoilState(profileShowState);

  return (
    <>
      <Box mb={3}>
        <Box display="flex" gap={2.5} mb={1}>
          <Avatar alt="User" src="" sx={{ width: 100, height: 100 }} />
          <Box mt={2} display="flex" flexDirection="column">
            <Typography
              variant="paragraph"
              sx={{
                fontWeight: "bold",
              }}
            >
              {user.data?.name}
            </Typography>
            <Typography variant="paragraph" color="GrayText">
              (Student)
            </Typography>
            <Typography variant="paragraph" color="GrayText">
              {user.data?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuList>
          <Link href="/user/mybooks">
            <MenuItem>
              <ListItemIcon>
                <Favorite fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Books </ListItemText>
            </MenuItem>
          </Link>
          <Link href="/user/favorites">
            <MenuItem>
              <ListItemIcon>
                <Favorite fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Favorites</ListItemText>
            </MenuItem>
          </Link>

          <Link href="/admin/allbooks">
            <MenuItem>
              <ListItemIcon>
                <Upload />
              </ListItemIcon>
              <ListItemText>My Uploads</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Box>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          fontFamily: "'Josefin Sans', sans-serif",
        }}
        fullWidth
        onClick={() => (setIsLoggedIn(false), setShowProfile(false))}
      >
        Logout
      </Button>
    </>
  );
};

const ProfileMenu = ({ children }) => {
  const [showProfile, setShowProfile] = useRecoilState(profileShowState);
  return (
    <ClickAwayListener onClickAway={() => setShowProfile(false)}>
      <Paper
        sx={{
          position: "absolute",
          maxWidth: "350px",
          width: "100%",
          right: "20px",
          top: "60px",
        }}
        elevation={2}
      >
        <Box p={3}>
          <Profile />
        </Box>
      </Paper>
    </ClickAwayListener>
  );
};

export default ProfileMenu;
