import { Box, Container } from "@mui/material";
import React, { useCallback, useState } from "React";
import DragDropFile from "../components/DragDropFile";

import MainLayout from "../components/Layouts/MainLayout";

function Upload() {
  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 2 }}>
          <DragDropFile />
        </Box>
      </Container>
    </MainLayout>
  );
}
export default Upload;
