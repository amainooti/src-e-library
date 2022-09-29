import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";
import { colleges, getDepartment } from "./College";

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

const SuggestBook = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "background.paper",
        border: "2px solid primary.main",
        borderRadius: "8px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Formik
          initialValues={{
            title: "",
            author: "",
            department: "",
            college: "",
            level: "",
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Book title is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              router.push("/");
            }, 500);
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
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Book Request
              </Typography>
              <small
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "36px",
                }}
              >
                Please fill all fields to continue
              </small>
              <InputContainer>
                <small>Book Title</small>
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
                    <FormHelperText error id="helper-text-firstname-signup">
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
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.author}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <Typography color="GrayText" sx={{ textAlign: "center" }}>
                Who needs this book?
              </Typography>
              <InputContainer>
                <small>College</small>
                <FormControl fullWidth>
                  <Select
                    id="demo-simple-select-college"
                    name="college"
                    value={values.college}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  >
                    {colleges.map((college) => (
                      <MenuItem value={college.title} key={college.id}>
                        College of {college.title}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.college && errors.college && (
                    <FormHelperText error id="helper-text-college">
                      {errors.college}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <InputContainer>
                <small>Department</small>
                <FormControl fullWidth>
                  <Select
                    id="demo-simple-select=college"
                    name="department"
                    value={values.department}
                    onChange={(e) => {
                      setFieldValue("department", e.target.value);
                    }}
                    onBlur={handleBlur}
                    size="small"
                  >
                    {getDepartment(values.college).map((department, index) => (
                      <MenuItem value={department} key={index}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.department && errors.department && (
                    <FormHelperText error id="helper-text-department">
                      {errors.department}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <InputContainer>
                <small>Level</small>
                <FormControl fullWidth>
                  <Select
                    id="demo-simple-select-level"
                    value={values.level}
                    name="level"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  >
                    <MenuItem value="100 lvl">100 lvl</MenuItem>
                    <MenuItem value="200 lvl">200 lvl</MenuItem>
                    <MenuItem value="300 lvl">300 lvl</MenuItem>
                    <MenuItem value="400 lvl">400 lvl</MenuItem>
                    <MenuItem value="500 lvl">500 lvl</MenuItem>
                    <MenuItem value="600 lvl">600 lvl</MenuItem>
                  </Select>
                  {touched.level && errors.level && (
                    <FormHelperText error id="helper-text-level">
                      {errors.level}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting || !values.title}
                fullWidth
              >
                {isSubmitting ? <CircularProgress /> : "Submit"}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SuggestBook;
