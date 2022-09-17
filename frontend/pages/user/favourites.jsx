import { Box, Container } from "@mui/material";
import React from "react";
import MainLayout from "../../components/Layouts/MainLayout";

const LikedBooks = () => {
  return (
    <MainLayout>
      <Container>
        <Box sx={{ my: 2 }}>
          {[...new Array(40)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default LikedBooks;
