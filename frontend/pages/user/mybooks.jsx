import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Skeleton,
  Stack,
  Button,
} from "@mui/material";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import { SkeletonHorizontalBookCard } from "../../components/Common/SkeletonCard";
import MainLayout from "../../components/Layouts/MainLayout";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import Head from "next/head";
import { useRouter } from "next/router";

const MyBooks = () => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [myBooks, setMyBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getMyBooks = async () => {
      await axiosPrivate
        .get("/api/document/mybooks")
        .then((res) => {
          setLoading(false);
          setMyBooks(res.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    getMyBooks();
  }, [axiosPrivate]);

  return (
    <MainLayout>
      <Head>
        <title>My Books | SRC E-LIBRARY</title>
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
            My Books
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
          {myBooks.map((document, index) => (
            <Grid item xs={12} key={index}>
              <HorizontalBookCard {...document} />
            </Grid>
          ))}
          {!myBooks.length > 0 && loading && (
            <Grid item xs={12}>
              <Stack spacing={2}>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <SkeletonHorizontalBookCard key={index} />
                  ))}
              </Stack>
            </Grid>
          )}
          {!myBooks.length > 0 && !loading && (
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
              <Typography variant="h3" textAlign="center">
                No Book in your level or college has been uploaded.{" "}
              </Typography>
              <Stack direction="row" gap="1rem" mt={1}>
                <Button
                  size="large"
                  onClick={() => router.back()}
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                  }}
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

export default MyBooks;
