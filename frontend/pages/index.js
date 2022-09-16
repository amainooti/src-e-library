import React from "react";
import Head from "next/head";
import Image from "next/image";
import { styled, alpha } from "@mui/material/styles";

import { Box, Card, Container, Grid, Typography } from "@mui/material";
import MainLayout from "../components/Layouts/MainLayout";
import SearchBar from "../components/Common/Search";
import { BookCard } from "../components/Common/BookCard";
import UpdateIcon from "@mui/icons-material/Update";
import IndexLayout from "../components/Layouts/IndexLayout";
import { axiosInstance } from "./api/axiosInstance";

export default function Home() {
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    const getDocuments = async () => {
      await axiosInstance
        .get("/api/document")
        .then((res) => {
          setDocuments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDocuments();
  }, []);

  return (
    <IndexLayout>
      <Container
        maxWidth="lg"
        display="flex"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          mb={24}
          my={10}
          display="flex"
          gap={2}
          flexDirection="column"
          sx={{
            width: "100%",
            transform: "scale(1.5)",
            alignItems: "center",
            position: "",
            display: { xs: "none", md: "flex", lg: "flex" },
          }}
        >
          <Image
            src={"/assets/libclip.png"}
            alt="Book Cover Image"
            width={150}
            height={150}
            responsive="true"
          />
          <Box sx={{ flexGrow: { lg: 1, xs: 0 } }} />
          <SearchBar />
          <Box sx={{ flexGrow: { lg: 1 } }} />
        </Box>
        <Box
          display="flex"
          my={10}
          gap={2}
          flexDirection="column"
          sx={{
            width: "100%",
            alignItems: "center",
            position: "",
            display: { xs: "flex", md: "none", lg: "none" },
          }}
        >
          <Image
            src={"/assets/libclip.png"}
            alt="Book Cover Image"
            width={180}
            height={180}
            responsive="true"
          />
          <Box sx={{ flexGrow: { lg: 1, xs: 0 } }} />
          <SearchBar />
          <Box sx={{ flexGrow: { lg: 1, xs: 0 } }} />
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

          <Grid
            container
            spacing={{ xs: 3 }}
            sx={{
              overflow: "auto",
              height: "300px",
              flexDirection: "row",
            }}
          >
            {Array(12)
              .fill()
              .map((_, index) => (
                <Grid item lg={2} md={3} sm={4} xs={6} key={index}>
                  <BookCard />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </IndexLayout>
  );
}
