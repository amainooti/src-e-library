import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box align="center" p={5} mb={3}>
      <Typography color="white">
        &copy; {new Date().getFullYear()} ABUAD SRC. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
