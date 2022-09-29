import React from "react";
import { Container, Grid, Box, Typography, Modal } from "@mui/material";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";
import { axiosInstance } from "../api/axiosInstance";
import Image from "next/image";
import SuggestBook from "../../components/Common/SuggestBook";

const Search = () => {
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    const getRecentDocuments = async () => {
      await axiosInstance
        .get("/api/document")
        .then((res) => {
          console.log(res.data);
          setDocuments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRecentDocuments();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            Search Results for "search query"...
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {!documents ? (
            documents?.map((document, index) => (
              <Grid item xs={12} key={index}>
                <HorizontalBookCard {...document} />
              </Grid>
            ))
          ) : (
            <Box>
              <Image
                src="/assets/puzzle-21.png"
                alt=""
                width="200"
                height="200"
                responsive={true}
              />
              <Typography
                variant="h4"
                my={2}
                sx={{
                  fontFamily: "inherit",
                }}
              >
                No results found
              </Typography>
              <Typography
                variant="paragraph"
                my={2}
                sx={{
                  fontFamily: "inherit",
                }}
              >
                We are sorry, but we don't have this book in our library. You
                can{" "}
                <span
                  style={{
                    color: "#3f51b5",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={handleOpen}
                >
                  request it
                </span>{" "}
                and we will try to add it as soon as possible.
              </Typography>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <SuggestBook />
              </Modal>
            </Box>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Search;
