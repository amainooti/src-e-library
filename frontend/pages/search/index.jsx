import React from "react";
import { Container, Grid, Box, Typography, Modal, Button } from "@mui/material";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";
import { axiosInstance } from "../api/axiosInstance";
import Image from "next/image";
import SuggestBook from "../../components/Common/SuggestBook";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const Search = () => {
  const [searchDocuments, setSearchDocuments] = React.useState([]);
  // const [documents, setDocuments] = React.useState([]);
  const router = useRouter();
  const searchBook = router.query.book;
  React.useEffect(() => {
    const getSearchBook = async () => {
      await axiosInstance
        .get(`/api/document/search/${searchBook}`)
        .then((res) => {
          console.log(res.data);
          setSearchDocuments(res.data);
        });
    };
    if (searchBook) {
      getSearchBook();
    }
  }, [searchBook]);

  // React.useEffect(() => {
  //   const getRecentDocuments = async () => {
  //     await axiosInstance
  //       .get("/api/document")
  //       .then((res) => {
  //         console.log(res.data);
  //         setDocuments(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getRecentDocuments();
  // }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <MainLayout>
      <Head>
        <title>Search | SRC E-LIBRARY</title>
      </Head>
      <Container
        maxWidth="md"
        sx={{
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <Box sx={{ my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Search Results for &quot;{searchBook}&quot;...
          </Typography>
        </Box>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {searchDocuments.length ? (
            searchDocuments?.map((document, index) => (
              <>
                <Grid item xs={12} key={index}>
                  <HorizontalBookCard {...document} />
                </Grid>
              </>
            ))
          ) : (
            <Box
              sx={{ alignItems: "center" }}
              display="flex"
              flexDirection="column"
            >
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
          <Box sx={{ textAlign: "center" }} my={4}>
            <Typography
              variant="paragraph"
              my={2}
              sx={{
                fontFamily: "inherit",
              }}
            >
              If you can&apos;t find the book you are looking for
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={handleOpen}
              >
                request the book
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
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Search;
