import React from "react";
import {
  Container,
  Stack,
  Box,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { HorizontalBookCard } from "../../components/Common/BookCard";
import MainLayout from "../../components/Layouts/MainLayout";
import { axiosInstance } from "../api/axiosInstance";

const BookInfo = () => {
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

  return (
    <MainLayout>
      <Container>
        <Box display="flex">
          <CardMedia component="img" image="" width={100} />
          <Box sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h3">
                Living in the Light: A guide to personal transformation
              </Typography>
              <Typography component="p">
                258 Pages . 2001 . 2.74 MB. 928,451 Downloads
              </Typography>
              <Typography component="p">
                by <Box>David Sargent</Box>
              </Typography>
              <Box>
                <Button variant="contained">Download</Button>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Similar Documents</Typography>
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
