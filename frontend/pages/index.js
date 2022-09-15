import Head from "next/head";
import Image from "next/image";
import { styled, alpha } from "@mui/material/styles";

import { Box, Card, Container, Grid, Typography } from "@mui/material";
import MainLayout from "../components/Layouts/MainLayout";
import SearchBar from "../components/Common/Search";
import { BookCard } from "../components/Common/BookCard";
import UpdateIcon from "@mui/icons-material/Update";

const Main = styled(Box)(() => ({
  display: "flex",
  boxPack: "center",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
}));

export default function Home() {
  return (
    <MainLayout>
      <Container
        maxWidth="lg"
        display="flex"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Main>
          <Box mb={3}>
            <SearchBar />
          </Box>

          <Box mt={1}>
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <UpdateIcon />
              <h2
                style={{
                  marginBottom: "0px",
                  marginTop: "0px",
                  fontSize: "25px",
                  fontWeight: "700",
                  lineHeight: "1",
                  textTransform: "none",
                  whiteSpace: "normal",
                }}
              >
                Recently Added Books:
              </h2>
            </Box>

            <Grid container spacing={{ xs: 3 }}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <Grid item lg={2} md={2} sm={2} xs={6} key={index}>
                    <BookCard />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Main>
      </Container>
    </MainLayout>
  );
}
