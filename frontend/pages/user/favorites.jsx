import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { favoritesListState } from "../../atoms/favoritesAtom";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";

const LikedBooks = () => {
  var favoriteList = useRecoilValue(favoritesListState);
  const router = useRouter();

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
              <HorizontalBookCard {...document} />
            </Grid>
          ))}
          {!favoriteList.length > 0 && (
            <Box
              sx={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3">You have no Favorite Book.</Typography>

              <Stack direction="row" gap="1rem" mt={1}>
                <Button
                  size="large"
                  onClick={() => router.back()}
                  variant="outlined"
                  color="secondary"
                >
                  Go Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push("/")}
                >
                  Go to Home
                </Button>
              </Stack>
            </Box>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default LikedBooks;
