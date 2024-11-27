import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import ContextProvider from "./context";
import Nav from "./components/Nav/Nav"; // Import the Footer component
import Footer from "./components/Footer/Footer";
import { useWalletClient } from "wagmi";
import ApolloProviderWrapper from "./lib/ApolloProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProviderWrapper>
          <ContextProvider cookies={cookies}>
            <Nav />

            <main className="flex-grow  pt-[100px]  ">{children}</main>

            <Footer />
          </ContextProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
