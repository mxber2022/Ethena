// components/ApolloProviderWrapper.tsx
"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloclient_NFT, apolloclient_NFTMarketPlace } from "./apolloclient";

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({
  children,
}) => {
  return (
    <>
      <ApolloProvider client={apolloclient_NFT}>
        <ApolloProvider client={apolloclient_NFTMarketPlace}>
          {children}
        </ApolloProvider>
      </ApolloProvider>
    </>
  );
};

export default ApolloProviderWrapper;
