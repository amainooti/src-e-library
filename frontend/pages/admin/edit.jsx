import Image from "next/image";
import React, { useRef, useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import UploadIcon from "@mui/icons-material/Upload";
import MainLayout from "../../components/Layouts/MainLayout";
import {
  FormControl,
  OutlinedInput,
  styled,
  FormHelperText,
  CircularProgress,
  Box,
  Button,
  Container,
  InputAdornment,
  Grid,
  Autocomplete,
  TextField,
} from "@mui/material";

import axiosInstance from "../api/axiosInstance";

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

async function handleFile(files, setFieldValue) {
  var pdf = files[0];
  var details = await pdfDetails(pdf);
  setFieldValue("pageCount", details[0].Pages);
}

function pdfDetails(pdfBlob) {
  return new Promise((done) => {
    var reader = new FileReader();
    reader.onload = function () {
      var raw = reader.result;
      var Pages = raw.match(/\Type[\s]*\/Page[^s]/g)?.length;
      var regex = /<xmp.*?:(.*?)>(.*?)</g;
      var meta = [
        {
          Pages,
        },
      ];
      var matches = regex.exec(raw);
      while (matches != null) {
        matches.shift();
        meta.push({
          [matches.shift()]: matches.shift(),
        });
        matches = regex.exec(raw);
      }
      done(meta);
    };
    reader.readAsBinaryString(pdfBlob);
  });
}

export default function EditBook({ selectedBook }) {
  const router = useRouter();
  const [dragActive, setDragActive] = React.useState(false);
  const [tagOptions, setTagOptions] = React.useState([]);
  const inputRef = React.useRef(null);

  if (selectedBook?.tags) {
    selectedBook.tags.map((tags) => {});
  }

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const getAllTag = async () => {
      await axiosInstance.get("/api/tags").then((res) => {
        setTagOptions(res.data);
      });
    };
    getAllTag();
  }, []);

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Box sx={{ my: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1} mb={3}>
              <UploadIcon />
              <h2
                style={{
                  marginBottom: "0px",
                  marginTop: "0px",
                  fontSize: "25px",
                  fontWeight: "700",
                  lineHeight: "1",
                  textTransform: "none",
                  whiteSpace: "normal",
                }}
              >
                Update Book
              </h2>
            </Box>
            <Button variant="contained" onClick={() => router.back()}>
              Back
            </Button>
          </Box>

          <Formik
            initialValues={{
              title: selectedBook.title,
              author: selectedBook.author,
              pageCount: selectedBook.noOfPages,
              bookDesc: selectedBook?.description,
              tags: [],
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("A Title is required"),
              author: Yup.string().required("An Author Name is required!"),
              pageCount: Yup.number().required("Page Count is required!"),
              bookDesc: Yup.string().required("Description is required!"),
              tags: Yup.array()
                .min(1, "You can't leave this blank.")
                .required("You can't leave this blank.")
                .nullable(),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              console.log(values);
            }}
          >
            {({
              values,
              setFieldValue,
              handleSubmit,
              handleChange,
              errors,
              handleBlur,
              touched,
              isSubmitting,
              resetForm,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid
                  container
                  sx={{
                    height: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  spacing={3}
                >
                  <Grid item xs={12} sm={5}>
                    <Image
                      src={`http://localhost:8080/api/document/thumbnail/${selectedBook._id}`}
                      alt="Book Cover Image"
                      width={400}
                      height={400}
                      responsive="true"
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <InputContainer>
                        <small>Title</small>
                        <FormControl fullWidth>
                          <OutlinedInput
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size="small"
                          />
                          {touched.title && errors.title && (
                            <FormHelperText error id="helper-text-book-title">
                              {errors.title}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </InputContainer>
                      <InputContainer>
                        <small>Author</small>
                        <FormControl fullWidth>
                          <OutlinedInput
                            type="text"
                            name="author"
                            value={values.author}
                            onChange={handleChange}
                            size="small"
                          />
                          {touched.author && errors.author && (
                            <FormHelperText error id="helper-text-book-author">
                              {errors.author}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </InputContainer>
                      <InputContainer>
                        <small>Number of Pages</small>
                        <FormControl fullWidth>
                          <OutlinedInput
                            type="number"
                            name="pageCount"
                            value={values.pageCount}
                            onChange={handleChange}
                            size="small"
                            color="secondary"
                            disabled
                            endAdornment={
                              <InputAdornment position="end">
                                Pages
                              </InputAdornment>
                            }
                          />
                          {touched.pageCount && errors.pageCount && (
                            <FormHelperText error id="helper-text-page-count">
                              {errors.pageCount}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </InputContainer>
                      <InputContainer>
                        <small>Book Description</small>
                        <FormControl fullWidth>
                          <OutlinedInput
                            id="multiline"
                            multiline
                            type="text"
                            name="bookDesc"
                            maxRows={5}
                            value={values.bookDesc}
                            onChange={handleChange}
                            size="small"
                          />
                          {touched.bookDesc && errors.bookDesc && (
                            <FormHelperText error id="helper-text-book-desc">
                              {errors.bookDesc}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </InputContainer>
                      <InputContainer>
                        <small>Tags</small>
                        <FormControl fullWidth>
                          <Autocomplete
                            size="small"
                            multiple
                            freeSolo
                            id="tags-standard"
                            options={
                              tagOptions
                                ? tagOptions.map((obj) => obj.title)
                                : []
                            }
                            value={values.tags}
                            inputValue={inputValue}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                              setFieldValue("tags", newValue);
                            }}
                            onInputChange={(event, newInputValue) => {
                              const options = newInputValue.split(",");
                              if (options.length > 1) {
                                setValue(
                                  value
                                    .concat(options)
                                    .map((x) => x.trim())
                                    .filter((x) => x)
                                );
                              } else {
                                setInputValue(newInputValue);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="tags"
                                placeholder="Use comma(,) to separate tags"
                              />
                            )}
                          />
                          {touched.tags && errors.tags && (
                            <FormHelperText error id="helper-text-book-tags">
                              {errors.tags}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </InputContainer>

                      <Box gap={1} display="flex">
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                          endIcon={<UploadIcon />}
                        >
                          {isSubmitting ? <CircularProgress /> : "Update"}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  console.log(query?.book);
  const resp = await axiosInstance.get(`/api/document/${query?.book}`);
  const data = await resp.data;

  return {
    props: { selectedBook: data },
  };
}