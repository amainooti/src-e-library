import React from "react";
import { Card, Box, Skeleton, Stack } from "@mui/material";

export const SkeletonHorizontalBookCard = () => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box display="flex" sx={{ p: 2, overflow: "hidden" }}>
        <Box>
          <Skeleton variant="rectangular" height={130} width={180} />
        </Box>
        <Box sx={{ ml: 3 }}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width={500} />
            <Skeleton variant="rectangular" width={50} />
            <Skeleton variant="rectangular" width={150} />
            <Skeleton variant="rectangular" width={350} />
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};
