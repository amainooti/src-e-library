import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot } from "recoil";
import PersistLogin from "../components/Common/PersistLogin";
import { theme } from "../src/theme";

import { ThemeProvider } from "@mui/material/styles";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <NextNProgress
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
            color="#074682"
          />
          <PersistLogin>
            <Component {...pageProps} />
          </PersistLogin>
        </RecoilRoot>
      </ThemeProvider>

      <div className="background-items">
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    </>
  );
}

export default MyApp;
