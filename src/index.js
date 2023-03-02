import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider } from '@chakra-ui/react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { extendTheme } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion';
import { StopScreenMessageProvider } from './constants/stopScreenMessage';

// Wagmi & RainbowKit setup
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import FantomLogo from "../src/assets/fantomlogo.svg"

// custom chain
const insureLabFantomTestnet = {
  id: 4002,
  name: 'Fantom',
  network: 'fantomTestnet',
  iconUrl: FantomLogo,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Fantom',
    symbol: 'FTM'
  },
  rpcUrls: {
    default: 'https://fantom-testnet.public.blastapi.io'
  },
  blockExplorers: {
    etherscan: { name: 'FtmScan', url: 'https://testnet.ftmscan.com/' },
    default: {name: 'FtmScan', url: 'https://testnet.ftmscan.com/' },
  },
  contracts: {},
  testnet: true,
}

const { provider, chains } = configureChains(
  [insureLabFantomTestnet],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
)

const { connectors } = getDefaultWallets({
  appName: "InsureLab",
  chains
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
});


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const colors = {
   white: "#FFFFFF",
   bg: "#FBFDFF",
   navbarBgColor: 'FFFFFF',
   ctaBg: "#3E7FDF",
   footerBgColor: "linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE;",
}

const theme = extendTheme({
  components: {
    // Steps,
  },
  colors
});
// const theme = extendTheme({ colors })

root.render(
  <StrictMode>
    <StopScreenMessageProvider>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
      <AnimatePresence initial={false} mode="wait">
        <ChakraProvider theme={theme}>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <ColorModeScript />
            <App />
          </SkeletonTheme>
        </ChakraProvider>
        </AnimatePresence>
      </RainbowKitProvider>
    </WagmiConfig>
    </StopScreenMessageProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
