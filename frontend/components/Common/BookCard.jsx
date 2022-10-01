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
import { Box, Checkbox } from "@mui/material";

import { RWebShare } from "react-web-share";
import { createKey } from "next/dist/shared/lib/router/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { favoritesListState } from "../../atoms/favoritesAtom";
import { loginModalState } from "../../atoms/profileAtom";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import userState from "../../atoms/userAtom";
import { loginModalState } from "../../atoms/profileAtom";

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

  return (
    <Box
      sx={{
        borderRadius: "4px",
        overflow: "hidden",
        flexShrink: 0,
        itemAlign: "center",
      }}
    >
      <BookLink href={`/book/${bookId}`}>
        <Image
          src={
            bookId
              ? `${image?.substr(0, image?.lastIndexOf("."))}.png`
              : "/assets/book.jpg"
          }
          alt="Book Cover Image"
          width={width || 400}
          height={width || 400}
          intrinsic
          responsive="true"
        />
      </BookLink>
    </Box>
  );
};

export const BookCard = (props) => {
  const [over, setOver] = useState(false);
  const user = useRecoilValue(userState);
  const [favList, setFavList] = useRecoilState(favoritesListState);
  const axiosPrivate = useAxiosPrivate();

  const favoriteBookActive = favList.filter(
    (item) => item._id === props?._id
  ).length;

  const handleLiked = (documentId) => {
    const updateFavorite = async () => {
      await axiosPrivate
        .post("/api/document/favorite", { documentId })
        .then((res) => {
          setFavList(res.data);
        });
    };
    if (user?.loggedIn) {
      updateFavorite();
    }
  };

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
        background: " rgba( 255, 255, 255, 0.4 )",
      }}
      elevation={over ? 1 : 0}
    >
      <BookImage image={props?.urlPath} bookId={props?._id} />
      <CardActions
        sx={{
          justifyContent: "space-evenly",
        }}
      >
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          onChange={() => handleLiked(props?._id)}
          checked={favoriteBookActive}
          inputProps={{ "aria-label": "controlled" }}
        />
        <RWebShare
          data={{
            text: "Web Share - GfG",
            url: `/book/${props._id}`,
            title: `Share ${props.title} - ABUAD E-Library`,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </RWebShare>
        <IconButton aria-label="download" component="a" href={props.urlPath}>
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export const HorizontalBookCard = (props) => {
  const axiosPrivate = useAxiosPrivate();
  // const setFavList = useSetRecoilState(favoritesListState);
  const user = useRecoilValue(userState);
  const [favList, setFavList] = useRecoilState(favoritesListState);

  const handleLiked = (documentId) => {
    const updateFavorite = async () => {
      await axiosPrivate
        .post("/api/document/favorite", { documentId })
        .then((res) => {
          setFavList(res.data);
        });
    };
    if (user?.loggedIn) {
      updateFavorite();
    } else {
      setLoginModal(true);
    }
  };
  const loginState = useRecoilValue(userState);
  const setLoginModal = useSetRecoilState(loginModalState);

  const favoriteBookActive = favList.filter(
    (item) => item._id === props?._id
  ).length;

  return (
    <Card
      sx={{
        height: "150px",
        display: "flex",
        justifyContent: "space-between",
        background: "rgba( 255, 255, 255, 0.4 )",
      }}
    >
      <Box display="flex">
        <Box p={1}>
          <BookImage image={props?.urlPath} bookId={props?._id} width={130} />
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
            <Typography>{props.noOfPages || "1234"} pages</Typography>

            <Typography>{props.fileSize || "0" + " MB"}</Typography>
          </Box>
          <Typography
            color="GrayText"
            display={{ xs: "none", sm: "block" }}
            sx={{
              // width: "500px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.description || "No Description"}
          </Typography>
        </Box>
      </Box>
      {/* <CardActions flexDirection={{ md: "column", xs: "row" }} display="flex"> */}
      <Box justifyContent="center" alignItems="center" display="flex">
        <Box display="flex" flexDirection={{ md: "row", xs: "column" }}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={() => handleLiked(props?._id)}
            checked={favoriteBookActive}
            inputProps={{ "aria-label": "controlled" }}
          />
          <RWebShare
            data={{
              text: "Web Share - GfG",
              url: `/book/${props.bookId}`,
              title: `Share ${props.title}  - SRC E-Library`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </RWebShare>
          {user.loggedIn ? (
            <IconButton
              aria-label="download"
              component="a"
              href={props.urlPath}
            >
              <DownloadIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="download"
              component="a"
              onClick={() => setLoginModal(true)}
            >
              <DownloadIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
};
