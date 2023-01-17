import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Typography,
  TablePagination,
  usePagination,
} from "@mui/material";

import SearchBar from "../components/Common/Search";
import { BookCard } from "../components/Common/BookCard";
import IndexLayout from "../components/Layouts/IndexLayout";
import React, { useState } from "react";
import LoginForm from "../components/AuthForms/LoginForm";
import { useRecoilState } from "recoil";
import { axiosInstance } from "./api/axiosInstance";
import { loginModalState } from "../atoms/profileAtom";

export default function Home() {
  let [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [documents, setDocuments] = React.useState([]);
  const [modal, setModal] = useRecoilState(loginModalState);
  const indexOfLastPdf = page * rowsPerPage;
  const indexOfFirstPdf = indexOfLastPdf - rowsPerPage;
  const [currentPaginationData, setCurrentPaginationData] = React.useState([]);
  const count = React.useMemo(
    () => Math.ceil(documents.length / rowsPerPage),
    [documents.length, rowsPerPage]
  );

  React.useEffect(() => {
    const data = documents.slice(indexOfFirstPdf, indexOfLastPdf);
    setCurrentPaginationData(data);
  }, [documents, indexOfFirstPdf, indexOfLastPdf]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    const getDocuments = async () => {
      await axiosInstance
        .get("/api/document")
        .then((res) => {
          setDocuments(res.data);
        })
        .catch((err) => {
          console.log(err?.response);
        });
    };
    getDocuments();
  }, []);

  return (
    <IndexLayout>
      <Head>
        <title>SRC E-LIBRARY</title>
      </Head>
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
          mt={10}
          mb={3}
          display="flex"
          gap={2}
          flexDirection="column"
          sx={{
            width: "100%",
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
          <SearchBar
            style={{
              border: "2px solid red",
            }}
          />
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
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            mb={3}
            sx={{ marginBottom: "10px" }}
          >
            <UpdateIcon />
            <h2
              style={{
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
          <Box sx={{ mb: 2 }}>
            <Link
              href="https://drive.google.com/drive/folders/1--34bdDu4apLX300sj16oLv5TsKtcdoz"
              target="_blank"
              passHref
            >
              <Button variant="contained" color="primary" target="_blank">
                View More Books
              </Button>
            </Link>
          </Box>
          <Modal
            open={modal}
            onClose={() => {
              setModal(false);
            }}
          >
            <Box
              sx={{
                width: { md: "500px", sm: "80%", xs: "100%" },
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <LoginForm />
            </Box>
          </Modal>
          <Grid
            container
            spacing={{ xs: 3 }}
            sx={{
              flexDirection: "row",
            }}
          >
            {/* {Array(12)
              .fill()
              .map((_, index) => (
                <Grid item lg={2} md={3} sm={4} xs={6} key={index}>
                  <BookCard />
                </Grid>
              ))} */}
            {currentPaginationData.map((document, index) => (
              <Grid item lg={2} md={3} sm={4} xs={6} key={index}>
                <BookCard {...document} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2 }}>
            <TablePagination
              component="div"
              page={page}
              count={count}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      </Container>
    </IndexLayout>
  );
}
