import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";
import { BLETestnet } from "../BLETestnet";

export const config = createConfig({
  chains: [BLETestnet],
  transports: {
    [BLETestnet.id]: http(),
  },
});
