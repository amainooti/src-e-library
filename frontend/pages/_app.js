import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        color="#fff"
      />
      <Component {...pageProps} />
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
