import { Avatar, Box, Typography, Paper, Button } from "@mui/material";
import React from "react";
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
        {/* // profile menu */}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet ea est
        molestiae commodi nisi officia cupiditate delectus sint voluptate aut
        cumque reiciendis rerum magni eos ducimus enim perspiciatis, ut
        repellat!
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
  return (
    <>
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
    </>
  );
};

export default ProfileMenu;
