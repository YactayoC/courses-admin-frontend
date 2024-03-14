import type { AppProps } from "next/app";
import { Provider } from "jotai"
import AuthGuard from "guards/authGuard";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </AuthGuard>
  );
}

export default MyApp;
