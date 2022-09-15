import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import axios from "axios";
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

const searchResults = async (str) => {
  try {
    let result = str.replace(/,/g, "");
    let { data } = await axiosInstance.get(`/api/document/search/${result}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

function SearchBar({ size }) {
  const theme = useTheme();
  const router = useRouter();
  const [resultOptions, setResultOptions] = useState([]);

  // const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log("Submitting Data");
    const searchData = data.get("search");
    console.log(resultOptions);
    const result = resultOptions.filter((item) => item.title === searchData);
    console.log(result);
    console.log(searchData);
    if (result.length > 0) {
      router.push(`/book/${result[0]._id}`);
    } else {
      console.log("Sorry book does not exist");
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
          size={size || "small"}
          id="book-search-bar"
          disableClearable
          options={resultOptions ? resultOptions.map((obj) => obj.title) : []}
          renderOption={(props, option) => (
            <Box
              key={option.id}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="40"
                height="40"
                src="/assets/book.jpg"
                srcSet="/assets/book.jpg"
                alt=""
              />
              {option}
            </Box>
          )}
          renderInput={(params) => {
            const { InputLabelProps, InputProps, ...rest } = params;
            return (
              <StyledInputBase
                {...params.InputProps}
                {...rest}
                name="search"
                onChange={(e) => onChangeQuery(e)}
                placeholder="Searching for..."
                // inputProps={{ "aria-label": "search" }}
                sx={{
                  width: "100%",
                }}
              />
            );
          }}
          noOptionsText={"empty array"}
        />
      </form>
    </Search>
  );
}

export default SearchBar;
