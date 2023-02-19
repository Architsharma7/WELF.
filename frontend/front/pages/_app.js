import "../styles/globals.css";
import localFont from "@next/font/local";
import { ChakraProvider } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";

const mantleTestnet = {
  id: 5001,
  name: "Mantle testnet",
  network: "Mantle testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test BIT",
    symbol: "BIT",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.mantle.xyz/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://explorer.testnet.mantle.xyz",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [mantleTestnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


const myFont = localFont({ src: "./CalSans-SemiBold.woff2" });


function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const showNavbar = (router.pathname == "/" ? false : true)
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <main className={myFont.className}>
           {showNavbar && <Navbar/>}
            <Component {...pageProps} />
          </main>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
