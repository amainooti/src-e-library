import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Button,
  Checkbox,
  Divider,
  Stack,
  OutlinedInput,
  styled,
  useTheme,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import * as Yup from "yup";

import { convertRoles } from "../../utils/helper";
import userState from "../../atoms/userAtom";
import axiosInstance from "../../pages/api/axiosInstance";
import { colleges, getDepartment } from "../Common/College";

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

const RegisterForm = () => {
  const theme = useTheme();
  const router = useRouter();

  const [user, setUser] = useRecoilState(userState);

  const [errorMessage, setErrorMessage] = React.useState();

  //   useEffect(() => {
  //     state.user && router.push("/");
  //   }, [state.user, router]);

  return (
    <>
      <Paper
        sx={{
          width: { md: "500px", sm: "80%", xs: "100%" },
          padding: { md: "2rem 3rem", xs: "2rem 1rem" },
          minHeight: { sm: "100%", xs: "100vh" },
          margin: "auto",
        }}
      >
        <Snackbar
          open={errorMessage ? true : false}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={() => {
            setErrorMessage();
          }}
          message={errorMessage}
        />
        <Formik
          initialValues={{
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: "",
            department: "",
            college: "",
            level: "",
            checked: false,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("An email is required"),
            firstname: Yup.string().required("First Name is required!"),
            lastname: Yup.string().required("Last Name is required!"),
            password: Yup.string().required("Password is required!"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Please confirm your password"),
            checked: Yup.bool().oneOf([true], "Field must be checked"),
          })}
          onSubmit={async (values) => {
            await axiosInstance
              .post("/api/users/register", values)
              .then((res) => {
                setUser({
                  loggedIn: true,
                  data: { ...res.data, roles: convertRoles(res?.data?.roles) },
                });
                router.push("/");
              })
              .catch((err) => {
                setErrorMessage(
                  err.response
                    ? err.response.data.error
                    : "An error occurred! Try again later."
                );
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
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Create Your Account
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
                <small>First Name</small>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>

              <InputContainer>
                <small>Last Name</small>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    size="small"
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>

              <InputContainer>
                <small>Email</small>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    size="small"
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>

              <InputContainer>
                <small>Password</small>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    size="small"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>

              <InputContainer>
                <small>Retype Password</small>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="small"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText
                      error
                      id="helper-text-confirm-password-signup"
                    >
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <InputContainer>
                <small>College</small>
                <FormControl fullWidth>
                  <Select
                    id="demo-simple-select=college"
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
                    <MenuItem value="100">100 lvl</MenuItem>
                    <MenuItem value="200">200 lvl</MenuItem>
                    <MenuItem value="300">300 lvl</MenuItem>
                    <MenuItem value="400">400 lvl</MenuItem>
                    <MenuItem value="500">500 lvl</MenuItem>
                    <MenuItem value="600">600 lvl</MenuItem>
                  </Select>
                  {touched.level && errors.level && (
                    <FormHelperText error id="helper-text-level">
                      {errors.level}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <FormControl>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={values.checked}
                      onChange={() => setFieldValue("checked", !values.checked)}
                      required
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Link href="/terms">
                        <a>
                          <Typography
                            variant="subtitle"
                            sx={{
                              borderBottom: "1px solid",
                            }}
                          >
                            Terms & Condition
                          </Typography>
                        </a>
                      </Link>
                    </Typography>
                  }
                  labelPlacement="end"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "1.5",
                  }}
                />
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting || !values.checked}
                fullWidth
              >
                {isSubmitting ? <CircularProgress /> : "Create Account"}
              </Button>
            </form>
          )}
        </Formik>
        <Divider sx={{ my: 3 }}>or</Divider>
        <Stack direction="column" spacing={3}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box>Already have an account?</Box>{" "}
            <Link href="/login">
              <a>
                <Typography
                  variant="h7"
                  sx={{
                    ml: "8px",
                    borderBottom: "1px solid",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Typography>
              </a>
            </Link>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "rgb(0 0 0 / 10%)", py: 2 }}
          >
            Forgot Your Password?
            <Link href="/login">
              <a>
                <Typography
                  variant="h7"
                  sx={{
                    ml: "8px",
                    borderBottom: "1px solid",
                    fontWeight: "600",
                  }}
                >
                  Reset It
                </Typography>
              </a>
            </Link>
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default RegisterForm;
