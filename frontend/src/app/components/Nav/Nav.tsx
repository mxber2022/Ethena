"use client";
import styles from "./Nav.module.css";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

function Nav() {
  //const { address, isConnected } = useAccount();

  const [wallets, setWallets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <div className={styles.nav__left}>
          <div>
            <Link href="/" style={{ color: "black", textDecoration: "none" }}>
              <div className={styles.nav__logo}>EthenaSea</div>
            </Link>
          </div>

          <div>
            <Link href="" style={{ color: "black", textDecoration: "none" }}>
              <p className={styles.tagline}> Buy Sell NFT using USDe </p>
            </Link>
          </div>

          <div>
            <Link
              className={`${styles.btn} rajdhani-medium`}
              href="/marketplace"
            >
              MarketPlace
            </Link>
          </div>

          <div>
            <Link className={`${styles.btn} rajdhani-medium`} href="/mynft">
              MyNFTs
            </Link>
          </div>

          <div>
            <Link
              className={`${styles.btn} rajdhani-medium`}
              href="/mylistednft"
            >
              MyListedNFT
            </Link>
          </div>
        </div>
        <div className={styles.nav__right}>
          <w3m-button />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
