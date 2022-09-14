import React from "react";
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Drawer,
  AppBar,
  styled,
  InputBase,
  Stack,
  alpha,
  Tooltip,
  Button,
  Avatar,
  Paper,
  ClickAwayListener,
  Container,
} from "@mui/material";

import { Search, FavoriteBorderRounded } from "@mui/icons-material";
import ProfileMenu from "../Common/ProfileMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

// const Header = () => {
//   const [open, setOpen] = React.useState(false);
//   const [showProfile, setShowProfile] = React.useState(false);

//   return (
//     <AppBar>
//       <Box p={1} justifyContent="space-between" display="flex">
//         <Typography>Logo</Typography>
//         <Box sx={{ flexGrow: { lg: 1, xs: 0 } }} />
//         <SearchComp width="100%">
//           <SearchIconWrapper>
//             <Search />
//           </SearchIconWrapper>
//           <StyledInputBase
//             placeholder="Searching for..."
//             inputProps={{ "aria-label": "search" }}
//             sx={{
//               width: "100%",
//             }}
//           />
//         </SearchComp>
//         <Box sx={{ flexGrow: { lg: 1 } }} />
//         <Stack spacing={2} direction="row">
//           <Tooltip title="Profile" arrow>
//             <>
//               <Button
//                 textColor="inherit"
//                 onClick={() => setShowProfile((prev) => !prev)}
//                 sx={{}}
//               >
//                 <Typography mr={1}>User</Typography>
//                 <Avatar
//                   sx={{
//                     marginRight: "5px",
//                   }}
//                 />
//               </Button>
//               {showProfile && <ProfileMenu />}
//             </>
//           </Tooltip>
//         </Stack>
//       </Box>
//     </AppBar>
//   );
// };

const MainLayout = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
