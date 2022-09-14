import { Avatar, Box, Typography, Paper, Button } from "@mui/material";
import React from "react";

const Profile = () => {
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
              User Name
            </Typography>
            <Typography variant="paragraph" color="GrayText">
              (Student)
            </Typography>
            <Typography variant="paragraph" color="GrayText">
              email@med-x.com
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
        color="secondary"
        sx={{
          borderRadius: "1rem",
          textTransform: "none",
          fontFamily: "'Josefin Sans', sans-serif",
        }}
        fullWidth
      >
        Logout
      </Button>
    </>
  );
};

const ProfileMenu = ({ children }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        maxWidth: "350px",
        right: "20px",
        top: "60px",
      }}
      elevation={2}
    >
      <Box p={3}>
        <Profile />
      </Box>
    </Paper>
  );
};

export default ProfileMenu;
