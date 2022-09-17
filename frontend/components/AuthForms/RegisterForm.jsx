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
} from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

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

  const [errorMessage, setErrorMessage] = React.useState();

  //   useEffect(() => {
  //     state.user && router.push("/");
  //   }, [state.user, router]);

  useEffect(() => {
})


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
        <Formik
          initialValues={{
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            confirmPassword: "",
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
            await RegisterCall(values, dispatch, setErrorMessage).catch(
              (err) => {
                console.log(JSON.stringify(err));
              }
            );
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
                    color="secondary"
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
                    color="secondary"
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
                    color="secondary"
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
                    color="secondary"
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
                    size="small"
                    color="secondary"
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
              <FormControl>
                <FormControlLabel
                  value="end"
                  control={
                    <Checkbox
                      checked={values.checked}
                      onChange={() => setFieldValue("checked", !values.checked)}
                      color="secondary"
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
                color="secondary"
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
      <Snackbar
        open={errorMessage ? true : false}
        onClose={() => {
          setErrorMessage();
        }}
        message={errorMessage}
      />
    </>
  );
};

export default RegisterForm;
