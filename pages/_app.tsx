import "../styles/main.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Warp from "../components/Page/Warp";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Warp>
        <Component {...pageProps} />
      </Warp>
    </SessionProvider>
  );
}

export default MyApp;
