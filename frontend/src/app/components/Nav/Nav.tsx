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
              <div className={styles.nav__logo}>NFTMarketPlace</div>
            </Link>
          </div>

          {/* <div >
                        <Link href="/Donate" style={{ color: 'black', textDecoration: 'none' }}>
                            
                        </Link>
                    </div>

                    <div >
                        <Link href="/Bridge" style={{ color: 'black', textDecoration: 'none' }}>
                        
                        </Link>
                    </div>

                    <div >
                        <Link href="/Presentation" style={{ color: 'black', textDecoration: 'none' }}>
                        
                        </Link>
                    </div>
*/}
          <div>
            <Link href="" style={{ color: "black", textDecoration: "none" }}>
              <p className={styles.tagline}> Buy Sell NFT using USDe </p>
            </Link>
          </div>

          {/* <div>
            <Link className={`${styles.btn} rajdhani-medium`} href="/collab/mx">
              COLLAB
            </Link>
          </div> */}

          <div>
            <Link className={`${styles.btn} rajdhani-medium`} href="/collab/mx">
              MyNFTs
            </Link>
          </div>

          <div>
            <Link className={`${styles.btn} rajdhani-medium`} href="/collab/mx">
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
