import "../styles/globals.css";
import localFont from "@next/font/local";
import { ChakraProvider } from '@chakra-ui/react'

const myFont = localFont({ src: "./CalSans-SemiBold.woff2" });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
    </ChakraProvider>
  );
}

export default MyApp;
