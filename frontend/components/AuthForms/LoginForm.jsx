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
import * as Yup from "yup";

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
  const [errorMessage, setErrorMessage] = React.useState();
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  //   React.useEffect(() => {
  //     state.user && router.push("/");
  //   }, [state.user, router]);

  return (
    <>
      <Paper
        sx={{
          width: { sm: "60%" },
          padding: { md: "2rem 3rem", xs: "2rem 1rem" },
          //   minHeight: { sm: "100%", xs: "100vh" },
          margin: "auto",
        }}
      >
        <Snackbar
          open={errorMessage ? true : false}
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
            LoginCall(values, dispatch, setErrorMessage);
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
                    color="secondary"
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
                    color="secondary"
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
                color="secondary"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting || googleLoading ? <CircularProgress /> : "Login"}
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default LoginForm;
