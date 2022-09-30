import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import MainLayout from "../components/Layouts/MainLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const FourOhFour = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <Head>
        <title>404 | SRC E-LIBRARY</title>
      </Head>
      <AuthLayout>
        <Image
          src="/assets/taxi-page-not-found-1.png"
          alt=""
          width="256"
          height="221"
        />
        <Typography
          variant="h2"
          my={2}
          sx={{
            fontFamily: "inherit",
          }}
        >
          Page Not Found
        </Typography>
        <Stack direction="row" gap="1rem">
          <Button
            size="large"
            onClick={() => router.back()}
            variant="outlined"
            color="primary"
          >
            Go Back
          </Button>

          <Button variant="contained" color="primary" size="large">
            <Link href="/"> Go to Home</Link>
          </Button>
        </Stack>
      </AuthLayout>
    </MainLayout>
  );
};

export default FourOhFour;
