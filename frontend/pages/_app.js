import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot } from "recoil";
import PersistLogin from "../components/Common/PersistLogin";

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
        <PersistLogin>
          <Component {...pageProps} />
        </PersistLogin>
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
