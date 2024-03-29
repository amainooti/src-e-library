import React from "react";
import {
  Container,
  Stack,
  Box,
  CardMedia,
  Typography,
  Grid,
  Button,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";
import { axiosInstance } from "../api/axiosInstance";
import { Add, Router } from "@mui/icons-material";
import Head from "next/head";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userState from "../../atoms/userAtom";
import { loginModalState } from "../../atoms/profileAtom";

const BookInfo = () => {
  const router = useRouter();
  const [documents, setDocuments] = React.useState([]);
  const [selectedDocument, setSelectedDocument] = React.useState([]);

  const bookId = router.query.bookid;
  const loginState = useRecoilValue(userState);
  const setLoginModal = useSetRecoilState(loginModalState);

  React.useEffect(() => {
    const getBookById = async () => {
      await axiosInstance.get(`/api/document/${bookId}`).then((res) => {
        setSelectedDocument(res.data);
      });
    };
    getBookById();
  }, [bookId]);

  React.useEffect(() => {
    const getRecentDocuments = async () => {
      await axiosInstance
        .get("/api/document")
        .then((res) => {
          setDocuments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getRecentDocuments();
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>{`Download ${selectedDocument?.title} - SRC E-LIBRARY`}</title>
      </Head>
      <Container>
        <Box
          display="flex"
          sx={{ mt: 3, flexDirection: { xs: "column", sm: "row" } }}
        >
          {selectedDocument?.urlPath && (
            <Image
              src={`${selectedDocument?.urlPath?.substr(
                0,
                selectedDocument?.urlPath?.lastIndexOf(".")
              )}.png`}
              alt="book cover"
              width={400}
              height={400}
              responsive={true}
            />
          )}

          <Box sx={{ p: 3, flex: 1 }}>
            <Stack spacing={2}>
              <Typography variant="h4">{selectedDocument?.title}</Typography>
              <Box display="flex" flexDirection="row" gap={2}>
                <Typography variant="p" sx={{ display: "inline" }}>
                  {selectedDocument?.noOfPages} Pages
                </Typography>
                <Typography variant="p" sx={{ display: "inline" }}>
                  {selectedDocument.fileSize}
                </Typography>
                <Typography variant="p" sx={{ display: "inline" }}>
                  Download{selectedDocument.downloads !== 1 && "s"}:{" "}
                  {selectedDocument.downloads}
                </Typography>
              </Box>
              <Typography component="h6">
                by{" "}
                <span
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {selectedDocument.author}
                </span>
              </Typography>
              <Box display="flex">
                {selectedDocument?.tags?.map((tag) => (
                  <>
                    <Chip
                      label={tag?.title}
                      key={tag?._id}
                      sx={{
                        marginRight: "10px",
                      }}
                    />
                  </>
                ))}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Description:
                </Typography>
                <Typography component="h6">
                  {selectedDocument.description}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                {loginState.loggedIn ? (
                  <Button
                    variant="contained"
                    onClick={() => router.push(selectedDocument.urlPath)}
                  >
                    Download
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setLoginModal(true)}
                  >
                    Download
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ my: 3 }}>
            Similar Documents
          </Typography>
          <Box>
            <Stack spacing={3}>
              {documents.map((document, index) => (
                <Grid item xs={12} key={index}>
                  <HorizontalBookCard {...document} />
                </Grid>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default BookInfo;
