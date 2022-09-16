import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { getMetadata, Page } from "react-pdf";

function Upload() {
  const [file, setFile] = useState();

  return (
    <MainLayout>
      <Container>
        <Box sx={{ my: 2 }}></Box>
      </Container>
    </MainLayout>
  );
}

export default Upload;
