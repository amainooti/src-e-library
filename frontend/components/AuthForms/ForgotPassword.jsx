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
import { addToLocalStorage } from "../../utils/browserStorage";

import { convertRoles } from "../../utils/helper";
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

const ForgotPasswordForm = () => {
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
          initialValues={{ email: "", submit: null }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await axiosInstance
              .post("/api/users/requestResetPassword", values)
              .then((res) => {
                console.log(res.data);
                setSubmitting(false);
                // Put a sweeet alert that an Email has been sent
              })
              .catch((err) => {
                console.log(err.message);
                setErrorMessage(err.message);
                setSubmitting(false);
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
                Forgot Password
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
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Box color="GrayText">Know your password? </Box>
          <Link href="/login">
            <Typography
              variant="h7"
              sx={{
                ml: "8px !important",
                borderBottom: "1px solid",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </Typography>
          </Link>
        </Box>
      </Paper>
    </>
  );
};

export default ForgotPasswordForm;
