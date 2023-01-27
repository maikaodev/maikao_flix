import { AppProps } from "next/app";
import { Container } from "../components";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default App;
