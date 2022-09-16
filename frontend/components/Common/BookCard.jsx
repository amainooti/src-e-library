import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

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
import { Box } from "@mui/material";

import { RWebShare } from "react-web-share";

// eslint-disable-next-line react/display-name
const BookLink = React.forwardRef(
  (
    { as, children, href, replace, scroll, shallow, passHref, ...rest }, // extract all next/link props and pass the rest to the anchor tag
    ref
  ) => (
    <Link as={as} href={href} passHref={passHref} replace={replace}>
      <a {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  )
);

const BookImage = ({ image, bookId, width }) => {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="rgb(0,0,0,10%)" offset="20%" />
        <stop stop-color="rgb(0,0,0,15%)" offset="45%" />
        <stop stop-color="rgb(0,0,0,20%)" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="rgb(0,0,0,10%)" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  return (
    <div
      className="flex items-center flex-shrink-0 mr-6 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <BookLink href={`/book/${bookId}`}>
        <Image
          src={
            bookId
              ? `http://127.0.0.1:8080/api/document/thumbnail/${bookId}`
              : "/assets/book.jpg"
          }
          alt="Book Cover Image"
          width={width || 400}
          height={width || 400}
          responsive="true"
        />
      </BookLink>
    </div>
  );
};

export const BookCard = (props) => {
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
      <BookImage image={props?.image} bookId={props?._id} />
      <CardActions
        sx={{
          justifyContent: "space-evenly",
        }}
      >
        <IconButton aria-label="add to Liked Books">
          <FavoriteIcon />
        </IconButton>
        <RWebShare
          data={{
            text: "Web Share - GfG",
            url: `/book/${props.bookId}`,
            title: `Share ${props.title} - ABUAD E-Library`,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </RWebShare>
        <IconButton aria-label="download">
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export const HorizontalBookCard = (props) => {
  return (
    <Card
      sx={{
        height: "150px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box display="flex">
        <Box>
          <BookImage image={props?.image} bookId={props?._id} width={150} />
        </Box>
        <Box p={3}>
          <Link href={`/book/${props._id}`}>
            <a
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
                mb={1}
              >
                {props.title || "Book title"}
              </Typography>
            </a>
          </Link>

          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            color="GrayText"
            mb={1}
          >
            <Typography>{props.pageCount || "1234" + " pages"}</Typography>
            <Typography>{props.year || "2022"}</Typography>
            <Typography>{props.year || "0" + " MB"}</Typography>
          </Box>
          <Typography
            color="GrayText"
            sx={{
              width: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.desc ||
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga eaque est, debitis beatae atque perferendis optio necessitatibus fugiat error dicta placeat ducimus! Sunt fugiat esse ex a voluptatum laborum fuga?"}
          </Typography>
        </Box>
      </Box>
      <CardActions flexDirection="column" display="flex">
        <IconButton aria-label="add to Liked Books">
          <FavoriteIcon />
        </IconButton>
        <RWebShare
          data={{
            text: "Web Share - GfG",
            url: `/book/${props.bookId}`,
            title: "Share Book - ABUAD E-Library",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </RWebShare>
        <IconButton aria-label="download">
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
