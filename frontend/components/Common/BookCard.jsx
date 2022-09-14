import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";

export const BookCard = () => {
  const [over, setOver] = useState(false);

  return (
    <Card
      sx={{
        height: "100%",
        margin: "auto",
        display: "flex",
        overflow: "hidden",
        borderRadius: "8px",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0px 1px 3px rgb(3 0 71 / 9%)",
        transition: "all 250ms ease-in-out",
      }}
      elevation={over ? 1 : 0}
    >
      <Image
        src="/assets/book.jpg"
        alt="Book Cover Image"
        width={400}
        height={400}
        responsive
      />

      <CardActions
        sx={{
          justifyContent: "space-evenly",
        }}
      >
        <IconButton aria-label="add to Liked Books">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="download">
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export const HorizontalBookCard = () => {
  return <div>HorizontalBookCard</div>;
};
