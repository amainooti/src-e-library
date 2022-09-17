import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { favoritesListState } from "../../atoms/favoritesAtom";
import MainLayout from "../../components/Layouts/MainLayout";

const LikedBooks = () => {
  const favoriteList = useRecoilValue(favoritesListState);
  return (
    <MainLayout>
      {/* <Container>
        <Box sx={{ my: 2 }}>
          {todoList.map((todoItem) => (
            <TodoItem key={todoItem.id} item={todoItem} />
          ))}
        </Box>
      </Container> */}
      <Container
        maxWidth="md"
        sx={{
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <Box sx={{ my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            My Liked Books
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {/* {Array(24)
            .fill()
            .map((_, index) => (
              <Grid item xs={24} key={index}>
                <HorizontalBookCard />
              </Grid>
            ))} */}
          {favoriteList.map((document, index) => (
            <Grid item xs={12} key={index}>
              ksks
              <HorizontalBookCard {...document} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default LikedBooks;
