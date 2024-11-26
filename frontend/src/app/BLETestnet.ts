import { type Chain } from "viem";

export const BLETestnet = {
  id: 52085143,
  name: "BLETestnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.ethena.fi"] },
  },
  blockExplorers: {
    default: { name: "EthenaScan", url: "https://testnet.explorer.ethena.fi/" },
  },
  contracts: {},
} as const satisfies Chain;
