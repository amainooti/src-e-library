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
  Snackbar,
  IconButton,
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

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

function ResetPassword(props) {
  const theme = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const [errorMessage, setErrorMessage] = React.useState();
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

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
        <Snackbar
          open={errorMessage ? true : false}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          onClose={() => {
            setErrorMessage();
          }}
          message={errorMessage}
        />
        <Formik
          initialValues={{ password: "", confirmpassword: "", submit: null }}
          validationSchema={Yup.object().shape({
            password: Yup.string()
              .min(8)
              .max(244)
              .required("Password is required!"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Please confirm your password"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await axiosInstance
              .post("/api/users/resetPassword", {
                ...values,
                ...props,
              })
              .then((res) => {
                console.log(res.data);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title:
                    "Password has been updated successfully, you'd be redirected to login page",
                  showConfirmButton: false,
                  timer: 1500,
                });
                router.push("/login");
                // Create A Sweet alert here that Password has been updated successfully
                // Then redirect to login Page for user to login
              })
              .catch((err) => {
                console.log(err.message);
                setErrorMessage(err.message);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong! Please try again",
                  timer: 2500,
                  footer: err.message,
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
                Reset Password
              </small>

              <InputContainer>
                <FormControl fullWidth>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
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
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                    type={showPassword ? "text" : "password"}
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
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                {isSubmitting || googleLoading ? <CircularProgress /> : "Reset"}
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
}

export default ResetPassword;
