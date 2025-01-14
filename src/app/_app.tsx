import { GameProvider } from "@/context/GameContext";
import { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </SessionProvider>
  );
}

export default App;