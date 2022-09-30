import {
  Favorite,
  Upload,
  AutoStories,
  LockReset,
  Group,
  QuestionAnswer,
} from "@mui/icons-material";

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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileShowState } from "../../atoms/profileAtom";
import userState from "../../atoms/userAtom";
import useLogout from "../../hooks/useLogout";
import { useRouter } from "next/router";

const Profile = () => {
  const user = useRecoilValue(userState);
  const logout = useLogout();
  const setShowProfile = useSetRecoilState(profileShowState);
  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  const router = useRouter();

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
              ({user?.data?.roles?.includes("Admin") ? "Admin" : "Student"})
            </Typography>
            <Typography variant="paragraph" color="GrayText">
              {user.data?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <MenuList>
          <MenuItem
            onClick={() => (
              router.push("/user/mybooks"), setShowProfile(false)
            )}
          >
            <ListItemIcon>
              <AutoStories fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Books </ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => (
              router.push("/user/favorites"), setShowProfile(false)
            )}
          >
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            <ListItemText>My Favorites</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={() => (
              router.push("/resetpassword"), setShowProfile(false)
            )}
          >
            <ListItemIcon>
              <LockReset fontSize="small" />
            </ListItemIcon>
            <ListItemText>Reset Password</ListItemText>
          </MenuItem>
          <Divider />

          {user?.data?.roles?.includes("Admin") && (
            <>
              <MenuItem
                onClick={() => (
                  router.push("/admin/allusers"), setShowProfile(false)
                )}
              >
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText>View all Users</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => (
                  router.push("/admin/allbooks"), setShowProfile(false)
                )}
              >
                <ListItemIcon>
                  <Upload />
                </ListItemIcon>
                <ListItemText>My Uploads</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => (
                  router.push("/admin/requestedbooks"), setShowProfile(false)
                )}
              >
                <ListItemIcon>
                  <QuestionAnswer />
                </ListItemIcon>
                <ListItemText>Book Requests</ListItemText>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Box>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          fontFamily: "'Josefin Sans', sans-serif",
        }}
        fullWidth
        onClick={() => handleLogout()}
      >
        Logout
      </Button>
    </>
  );
};

const ProfileMenu = ({ children }) => {
  const setShowProfile = useSetRecoilState(profileShowState);
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
