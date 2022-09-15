import { Container, Grid } from "@mui/material";
import React from "react";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";

const Search = () => {
  return (
    <MainLayout>
      <Container
        maxWidth="md"
        sx={{
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <Grid container spacing={2}>
          {Array(24)
            .fill()
            .map((_, index) => (
              <Grid item xs={24} key={index}>
                <HorizontalBookCard />
              </Grid>
            ))}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Search;
