import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloclient_NFT = new ApolloClient({
  uri: "https://api.goldsky.com/api/public/project_clzhsxd1aulmx01zzbhjb8f9y/subgraphs/EthenaNFT-ethena-testnet/1.0/gn",
  cache: new InMemoryCache(),
});

export const apolloclient_NFTMarketPlace = new ApolloClient({
  uri: "https://api.goldsky.com/api/public/project_clzhsxd1aulmx01zzbhjb8f9y/subgraphs/EthenaNFT-ethena-testnet/1.0/gn",
  cache: new InMemoryCache(),
});
