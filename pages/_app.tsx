import "../styles/main.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Warp from "../components/Page/Warp";
import Application from "../components/Page/Application";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Warp>
        <Application>
          <Component {...pageProps} />
        </Application>
      </Warp>
    </SessionProvider>
  );
}

export default MyApp;
