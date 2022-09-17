import Image from "next/image";
import React, { useRef, useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
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

import axios from "axios";
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
  //   console.log(files);
  //   var fileName = files[0].name;
  //   var fileType = files[0].type;
  //   let fileSize = formatSizeUnits(files[0].size);

  //   console.log(fileName);
  //   console.log(fileType);
  //   console.log(fileSize);
  //   return fileName, fileType, fileSize;
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

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "0 bytes";
  }
  return bytes;
}

export default function Upload() {
  const [dragActive, setDragActive] = React.useState(false);

  const inputRef = React.useRef(null);

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

  const handleChangeFile = function (event, setFieldValue) {
    if (event.target.files && event.target.files[0]) {
      setFieldValue("document", event.target.files[0]);
      setFieldValue("title", event.target.files[0].name.split(".")[0]);
      handleFile(event.target.files, setFieldValue);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Box sx={{ my: 2 }}>
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
              Upload New Book
            </h2>
          </Box>

          <Formik
            initialValues={{
              title: "",
              document: undefined,
              author: "",
              pageCount: "",
              bookDesc: "",
              tags: [],
              file: null,
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
              const formData = new FormData();
              Object.entries(values).forEach((file) => {
                formData.append(file[0], file[1]);
              });
              await axiosInstance
                .post("/api/upload", formData)
                .then((res) => {
                  setSubmitting(false);
                  resetForm({ values: "" });
                })
                .catch((err) => {
                  console.log(err);
                  setSubmitting(false);
                });
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
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  spacing={3}
                >
                  <Grid item xs={12} sm={5}>
                    <div
                      id="form-file-upload"
                      onDragEnter={handleDrag}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        ref={inputRef}
                        type="file"
                        name="document"
                        id="input-file-upload"
                        accept=".pdf"
                        multiple={false}
                        onChange={(event) =>
                          handleChangeFile(event, setFieldValue)
                        }
                      />
                      <label
                        id="label-file-upload"
                        htmlFor="input-file-upload"
                        className={dragActive ? "drag-active" : ""}
                      >
                        <div>
                          <p>Drag and drop your file here or</p>
                          <Button variant="contained" onClick={onButtonClick}>
                            Upload a file
                          </Button>
                        </div>
                      </label>
                      {dragActive && (
                        <div
                          id="drag-file-element"
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        ></div>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Image
                        src={"/assets/book.jpg"}
                        alt="Book Cover Image"
                        width={200}
                        height={200}
                        responsive="true"
                      />
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
                            options={["Option 1"]}
                            value={value}
                            inputValue={inputValue}
                            onChange={(event, newValue) => {
                              setValue(newValue);
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
                          variant="outlined"
                          color="secondary"
                          onClick={() => resetForm({ values: "" })}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                          endIcon={<UploadIcon />}
                        >
                          {isSubmitting ? <CircularProgress /> : "Upload"}
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
