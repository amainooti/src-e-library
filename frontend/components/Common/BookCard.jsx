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
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

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
            url: `/book/${props._id}`,
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
  const [liked, setLiked] = useState(false);

  // const setFavList = useSetRecoilState(favoritesListState);
  const [favList, setFavList] = useRecoilState(favoritesListState);

  const addItem = () => {
    setFavList((oldList) => [
      ...oldList,
      {
        ...props,
      },
    ]);
  };

  const deleteItem = () => {
    var remainingArr = favList.filter((data) => data._id != props._id);
    setFavList(remainingArr);
  };

  function removeByKey(array, params) {
    array.some(function (item, index) {
      return array[index][params.key] === params.value
        ? !!array.splice(index, 1)
        : false;
    });
    return array;
  }

  const handleLiked = () => {
    setLiked((prev) => !prev);

    if (liked == true) {
      removeByKey(favList, {
        key: "_id",
        value: props._id,
      });
    }
    if (liked == false) {
      addItem();
    }

    console.log(favList);
  };

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
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          onChange={handleLiked}
          checked={liked}
          inputProps={{ "aria-label": "controlled" }}
          // sx={{
          //   color: "black",
          //   "&.Mui-checked": {
          //     color: "black",
          //   },
          // }}
        />
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
        <IconButton
          aria-label="download"
          component="a"
          href={`http://127.0.0.1:8080/api/document/download/${props._id}`}
        >
          <DownloadIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
