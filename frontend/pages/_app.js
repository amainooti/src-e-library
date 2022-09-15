import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <NextNProgress
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
          color="#fff"
        />
        <Component {...pageProps} />
      </RecoilRoot>
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
