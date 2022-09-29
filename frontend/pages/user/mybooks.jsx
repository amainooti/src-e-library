import { Box, Grid, Typography, Container } from "@mui/material";
import React from "react";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import { favoritesListState } from "../../atoms/favoritesAtom";
import { useRecoilValue } from "recoil";

const MyBooks = () => {
  var favoriteList = useRecoilValue(favoritesListState);

  return (
    <MainLayout>
      <Container
        maxWidth="md"
        sx={{
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <Box sx={{ my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            My Books
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {favoriteList.map((document, index) => (
            <Grid item xs={12} key={index}>
              <HorizontalBookCard {...document} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default MyBooks;
