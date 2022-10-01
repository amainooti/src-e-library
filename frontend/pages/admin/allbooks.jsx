import React from "react";
import {
  Typography,
  Container,
  Card,
  Box,
  IconButton,
  CardMedia,
  Modal,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CreateOutlined, DeleteOutlined } from "@mui/icons-material";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

import MainLayout from "../../components/Layouts/MainLayout";
import axiosInstance from "../api/axiosInstance";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

const classes = {
  cardPaper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    transform: "translate(-50%, -50%)",
    p: 4,
  },
};

const BookTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = React.useState(false);
  const [documents, setDocuments] = React.useState([]);
  const [deleteDocument, setDeleteDocument] = React.useState();
  const router = useRouter();

  React.useEffect(() => {
    const getAllDocuments = async () => {
      await axiosInstance.get("/api/document").then((res) => {
        setDocuments(res.data);
      });
    };
    getAllDocuments();
  }, []);

  const handleDelete = (documentId) => {
    const deleteProductById = async () => {
      await axiosPrivate.delete(`/api/document/${documentId}`).then((res) => {
        const newDocuments = documents.filter(
          (document) => document._id !== documentId
        );
        setDocuments(newDocuments);
      });
    };
    deleteProductById();
    setOpen(false);
  };

  const handleConfirm = (documentId, documentName) => {
    setDeleteDocument({ id: documentId, name: documentName });
    setOpen(true);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "thumb",
      headerName: "Thumbnail",
      width: 100,
      renderCell: (params) => (
        <Box>
          <CardMedia
            component="img"
            image={`${params.row.urlPath.substr(
              0,
              params.row.urlPath.lastIndexOf(".")
            )}.png`}
            sx={{ height: "3rem", width: "3rem" }}
          />
        </Box>
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 150 },
    {
      field: "updatedAt",
      headderName: "Updated At",
      width: 200,
      renderCell: (params) => (
        <>{moment(params.row.updatedAt).format("MMMM Do YYYY")}</>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link
            href={{ pathname: "/admin/edit", query: { book: params.row._id } }}
          >
            <IconButton>
              <CreateOutlined color="success" />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => handleConfirm(params.row._id, params.row.title)}
          >
            <DeleteOutlined color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      {deleteDocument && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={classes.cardPaper}>
            <Typography variant="h3">Confirmation</Typography>
            <Box sx={{ my: 4 }}>
              <Typography component="p">
                Are you sure you want to delete{" "}
                {deleteDocument && deleteDocument.name}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => handleDelete(deleteDocument.id)}
              >
                Yes
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      <Container>
        <Box sx={{ my: 3 }}>
          <Box sx={{ my: 2 }} display="flex" justifyContent="space-between">
            <Typography variant="h4">All Books</Typography>

            <Button
              variant="contained"
              onClick={() => router.push("/admin/upload")}
            >
              Upload
            </Button>
          </Box>
          <Card
            sx={{
              background: " rgba( 255, 255, 255, 0.5 )",
            }}
            elevation={1}
          >
            <Box sx={{ height: 700, width: "100%" }}>
              <DataGrid
                rows={documents}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                getRowId={(row) => row._id}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Card>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default BookTable;
