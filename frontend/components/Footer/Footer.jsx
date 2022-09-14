import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box align="center" mb={2}>
      <Typography>
        &copy; {new Date().getFullYear()} ABUAD SRC. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
