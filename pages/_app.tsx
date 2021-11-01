import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ padding: "4rem", margin: "0 auto", maxWidth: "1200px" }}>
      <Head>
        <link rel="stylesheet" href="" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
