import React from "react";

import {
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  Box,
  Button,
  styled,
  useTheme,
  InputAdornment,
  FormHelperText,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { addToLocalStorage } from "../../utils/browserStorage";

import { convertRoles } from "../../utils/helper";
import userState from "../../atoms/userAtom";
import axiosInstance from "../../pages/api/axiosInstance";
import Swal from "sweetalert2";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

function ChangePasswordForm(props) {
  const theme = useTheme();
  const axiosPrivate = usePrivateAxios();
  const [user, setUser] = useRecoilState(userState);
  const [errorMessage, setErrorMessage] = React.useState();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState([false, false, false]);
  // console.log(showPassword[0], showPassword[1], showPassword[2]);

  return (
    <>
      <Paper
        sx={{
          // width: { sm: "60%" },
          padding: { md: "2rem 3rem", xs: "2rem 1rem" },
          //   minHeight: { sm: "100%", xs: "100vh" },
          margin: "auto",
        }}
      >
        <Formik
          initialValues={{
            oldPassword: "",
            password: "",
            confirmpassword: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string()
              .min(8)
              .max(244)
              .required("Current Password is required!"),
            password: Yup.string()
              .min(8)
              .max(244)
              .required("Password is required!"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Please confirm your password"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            await axiosPrivate
              .post("/api/users/changepassword", {
                ...values,
              })
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title:
                    "Password has been updated successfully, you'd be redirected to login page",
                  timer: 2500,
                });
                resetForm({ values: "" });
                router.push("/");
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: err?.response?.data
                    ? err.response.data?.error
                    : `Something went wrong! Please try again`,
                  timer: 3500,
                  footer: errorMessage,
                });
              });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            touched,
            isSubmitting,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                SRC E-LIBRARY
              </Typography>
              <small
                style={{
                  display: "block",
                  textAlign: "center",
                  marginBottom: "36px",
                }}
              >
                Change Password
              </small>
              <InputContainer>
                <FormControl fullWidth>
                  <OutlinedInput
                    type={showPassword[0] ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Current Password"
                    onChange={handleChange}
                    value={values.oldPassword}
                    onBlur={handleBlur}
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockTwoToneIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() =>
                            setShowPassword((prev) => [
                              !prev[0],
                              prev[1],
                              prev[2],
                            ])
                          }
                        >
                          {showPassword[0] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <FormHelperText error id="helper-text-password-login">
                      {errors.oldPassword}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <Divider
                sx={{
                  marginBottom: "8px",
                }}
              />

              <InputContainer>
                <FormControl fullWidth>
                  <OutlinedInput
                    type={showPassword[1] ? "text" : "password"}
                    name="password"
                    placeholder="New Password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockTwoToneIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() =>
                            setShowPassword((prev) => [
                              prev[0],
                              !prev[1],
                              prev[2],
                            ])
                          }
                        >
                          {showPassword[1] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <InputContainer>
                <FormControl fullWidth>
                  <OutlinedInput
                    type={showPassword[2] ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockTwoToneIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() =>
                            setShowPassword((prev) => [
                              prev[0],
                              prev[1],
                              !prev[2],
                            ])
                          }
                        >
                          {showPassword[2] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="helper-text-password-login">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress /> : "Change Password"}
              </Button>
            </form>
          )}
        </Formik>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            marginTop: "8px",
          }}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </Paper>
    </>
  );
}

export default ChangePasswordForm;
