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
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { useRecoilState } from "recoil";
import * as Yup from "yup";

import userState from "../../atoms/userAtom";
import axiosInstance from "../../pages/api/axiosInstance";

const InputContainer = styled(Box)(() => ({
  marginBottom: "12px",
  "& small": {
    display: "block",
    marginBottom: "8px",
    textAlign: "left",
  },
}));

const LoginForm = ({ setMobileOpen }) => {
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
          initialValues={{ email: "", password: "", submit: null }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string()
              .min(8)
              .max(244)
              .required("Password is required!"),
          })}
          onSubmit={async (values) => {
            await axiosInstance
              .post("/api/users/login", values)
              .then((res) => {
                setUser({ loggedIn: true, data: res.data });
                router.push("/");
              })
              .catch((err) => {
                setErrorMessage(
                  err.response
                    ? err.response.data.error
                    : "An error occured! Trya again later."
                );
              });
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
                Login with email and password
              </small>

              <InputContainer>
                <FormControl fullWidth>
                  <OutlinedInput
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    placeholder="example@gmail.com"
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">
                        <EmailTwoToneIcon />
                      </InputAdornment>
                    }
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </InputContainer>

              <InputContainer>
                <FormControl fullWidth>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••••" //alt+7
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
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting || googleLoading ? <CircularProgress /> : "Login"}
              </Button>
            </form>
          )}
        </Formik>
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Box color="GrayText">Don&apos;t have an account? </Box>
          <Link href="/register">
            <Typography
              variant="h7"
              sx={{
                ml: "8px !important",
                borderBottom: "1px solid",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              SignUp
            </Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box color="GrayText">Forgot Your Password?</Box>
          <Link href="/forgotpassword">
            <Typography
              variant="h7"
              sx={{
                ml: "8px !important",
                cursor: "pointer",
                borderBottom: "1px solid",
                fontWeight: "600",
              }}
            >
              Reset It
            </Typography>
          </Link>
        </Box>
      </Paper>
    </>
  );
};

export default LoginForm;
