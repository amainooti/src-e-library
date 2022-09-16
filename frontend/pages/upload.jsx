import Image from "next/image";
import React, { useRef, useState } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import UploadIcon from "@mui/icons-material/Upload";
import MainLayout from "../components/Layouts/MainLayout";
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
} from "@mui/material";

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

async function handleFile(files) {
  var pdf = files[0];
  var details = await pdfDetails(pdf);
  console.log(details);
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

      var Pages = raw.match(/\Type[\s]*\/Page[^s]/g).length;

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
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

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
              author: "",
              pageCount: "",
              bookDesc: "",
              tags: [],
              file: null,
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().email().required("A Title is required"),
              author: Yup.string().required("An Author Name is required!"),
              pageCount: Yup.number().required("Page Count is required!"),
              bookDesc: Yup.string().required("Description is required!"),
            })}
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
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box display="flex" gap={5}>
                  <form
                    id="form-file-upload"
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      id="input-file-upload"
                      accept=".pdf"
                      multiple={true}
                      onChange={handleChange}
                    />
                    <label
                      id="label-file-upload"
                      htmlFor="input-file-upload"
                      className={dragActive ? "drag-active" : ""}
                    >
                      <div>
                        <p>Drag and drop your file here or</p>
                        <button
                          className="upload-button"
                          onClick={onButtonClick}
                        >
                          Upload a file
                        </button>
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
                  </form>

                  <Box>
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
                          color="secondary"
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
                          color="secondary"
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
                          color="secondary"
                        />
                        {touched.bookDesc && errors.bookDesc && (
                          <FormHelperText error id="helper-text-book-desc">
                            {errors.bookDesc}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </InputContainer>
                    <Box gap={1} display="flex">
                      <Button variant="outlined" color="secondary">
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disabled={isSubmitting}
                        endIcon={<UploadIcon />}
                      >
                        {isSubmitting ? <CircularProgress /> : "Upload"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </MainLayout>
  );
}
