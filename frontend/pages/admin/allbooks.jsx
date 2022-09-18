import React from "react";
import {
  Typography,
  Container,
  Card,
  Box,
  IconButton,
  CardMedia,
  Button,
} from "@mui/material";
import MainLayout from "../../components/Layouts/MainLayout";
import axiosInstance from "../api/axiosInstance";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CreateOutlined, DeleteOutlined } from "@mui/icons-material";
import Link from "next/link";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "thumb",
    headerName: "Thumbnail",
    width: 100,
    renderCell: (params) => (
      <Box>
        <CardMedia
          component="img"
          image={`http://localhost:8080/api/document/thumbnail/${params.row._id}`}
          sx={{ height: "3rem", width: "3rem" }}
        />
      </Box>
    ),
  },
  { field: "author", headerName: "Author", width: 150 },
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
            <CreateOutlined />
          </IconButton>
        </Link>
        <IconButton>
          <DeleteOutlined />
        </IconButton>
      </>
    ),
  },
];

const BookTable = () => {
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    const getAllDocuments = async () => {
      await axiosInstance.get("/api/document").then((res) => {
        setDocuments(res.data);
      });
    };
    getAllDocuments();
  }, []);
  return (
    <MainLayout>
      <Container>
        <Box sx={{ my: 3 }}>
          <Box sx={{ my: 2 }} display="flex" justifyContent="space-between">
            <Typography variant="h4">Books</Typography>
            <Link href="/admin/upload">
              <Button variant="contained">Upload</Button>
            </Link>
          </Box>
          <Card>
            <Box sx={{ height: 700, width: "100%" }}>
              <DataGrid
                rows={documents}
                columns={columns}
                checkboxSelection
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
