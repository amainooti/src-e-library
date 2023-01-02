import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import { axiosInstance } from "../../pages/api/axiosInstance";

import {
  TextField,
  Autocomplete,
  Box,
  InputBase,
  Stack,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  maxWidth: "700px",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   width: "auto",
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

function SearchBar({ size }) {
  const theme = useTheme();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [resultOptions, setResultOptions] = useState([]);

  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const searchData = data.get("search");
    console.log(searchData);
    const result = resultOptions?.filter((item) => item.title === searchData);

    if (searchValue.length > 0) {
      router.push({
        pathname: "/search",
        query: { book: searchValue },
      });
    } else {
      console.log(searchData);
      console.log("Sorry book does not exist");
    }
    // if (result.length > 0) {
    //   router.push({
    //     pathname: "/search",
    //     query: { book: result[0].title },
    //   });
    // } else {
    //   console.log(searchData);
    //   console.log("Sorry book does not exist");
    // }
  };

  const searchResults = async (str) => {
    try {
      let result = str.replace(/,/g, "");
      let { data } = await axiosInstance.get(`/api/document/search/${result}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeQuery = async (e) => {
    if (e.target.value) {
      let data = await searchResults(e.target.value);
      setResultOptions(data);
    }
  };

  return (
    <Search>
      <form onSubmit={handleSearch}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Autocomplete
          freeSolo
          // getOptionLabel={(option) => option.title}
          getOptionLabel={(option) => {
            if (option.hasOwnProperty("title")) {
              return option.title;
            }
            return option;
          }}
          onChange={(e) =>
            router.push("/book/" + resultOptions[e.target.value]?._id)
          }
          size={size || "small"}
          id="book-search-bar"
          disableClearable
          options={resultOptions ? resultOptions.map((obj) => obj) : []}
          renderOption={(props, option) => (
            <Box
              key={option._id}
              component="li"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
                "& > div": { flexGrow: 1 },
              }}
              {...props}
            >
              <Image
                width="40"
                height="40"
                src={`${option?.urlPath?.substr(
                  0,
                  option?.urlPath?.lastIndexOf(".")
                )}.png`}
                srcSet="/assets/book.jpg"
                alt=""
              />
              {option.title}
            </Box>
          )}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return (
              <StyledInputBase
                {...params.InputProps}
                {...rest}
                name="search"
                onChange={(e) => (
                  onChangeQuery(e), setSearchValue(e.target.value)
                )}
                placeholder="Searching for..."
                // inputProps={{ "aria-label": "search" }}
                sx={{
                  width: "100%",
                }}
              />
            );
          }}
        />
      </form>
    </Search>
  );
}

export default SearchBar;
