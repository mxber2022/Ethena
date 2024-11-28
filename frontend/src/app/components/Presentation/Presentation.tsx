"use client";

import { useState } from "react";
import styles from "./Presentation.module.css";
import Image from "next/image";

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "",
      content: (
        <>
          <p>
            <strong>Name:</strong> MX
          </p>
          <p>
            <strong>Date:</strong> 29.Nov 2024
          </p>
          <p>
            <strong>Project: </strong> EthenaSea
          </p>
          <p>
            <strong>Goal: </strong> {"Buy Sell List NFT using USDe"}
          </p>
        </>
      ),
    },
    {
      title: "About EthenaSea",
      content: (
        <>
          <h2></h2>
          <p>
            <strong></strong> EthenaSea is an innovative NFT marketplace powered
            by the Ethena USDe stablecoin, offering a secure and seamless
            platform for creators, collectors, and traders alike. By integrating
            USDe, EthenaSea ensures consistent pricing and reliable
            transactions, making it easier for users to explore, buy, and sell
            unique digital assets without the volatility typically associated
            with cryptocurrency markets. This marketplace merges the creative
            possibilities of NFTs with the dependable nature of stablecoin
            technology, providing a fluid and trustworthy environment for the
            future of digital collectibles and art. Sail into the future of NFTs
            with EthenaSea, where stability meets creativity.{" "}
          </p>
        </>
      ),
    },
    {
      title: "Why EthenaSea",
      content: (
        <>
          <h2></h2>
          <p>
            <strong>Enhanced Fan Engagement:</strong> Fans get a deeper, more
            meaningful interaction with celebrities by co-creating unique art
            together.{" "}
          </p>
          <p>
            <strong>Personalized and Authentic Content:</strong> The platform
            allows fans and celebrities to collaborate on personalized,
            one-of-a-kind creations.{" "}
          </p>
          <p>
            <strong>Monetization and New Revenue Streams:</strong> Celebrities
            can monetize their fan engagement by selling co-created NFT artwork.{" "}
          </p>
          <p>
            <strong>Innovation in AI and Creative Expression:</strong> The
            platform leverages AI to empower both fans and celebrities in the
            creative process.{" "}
          </p>
          <p>
            <strong>NFT Collectibles with Emotional Value:</strong> Fans can own
            emotionally meaningful, signed digital collectibles from their
            favorite celebrities.{" "}
          </p>
          <p>
            <strong>Exclusive Access and Fandom Prestige:</strong> Only select
            fans can collaborate, offering exclusive interactions and fan
            prestige.{" "}
          </p>
          <p>
            <strong>Leveraging the Growing NFT and Web3 Market:</strong> The
            platform taps into the booming NFT and Web3 space for fan-driven,
            decentralized experiences.{" "}
          </p>
        </>
      ),
    },

    {
      title: "Demo",
      content: (
        <>
          {/* <h2></h2>
                       <p><strong>Goal:</strong> is to make crosschain donation using wormhole on twitter(post). </p>
                       <p><strong></strong> We will donate 1 USDC from Ethereum sepolia to optimism sepolia. </p>
                       <br></br>
                       <video width="600" controls>
                        <br></br>
                    <source src="/finalsnapha.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
        </>
      ),
    },

    {
      title: "Thank You",
      content: (
        <>
          <h2></h2>
        </>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.slider}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === currentSlide ? styles.active : ""
                }`}
              >
                <h3 className={styles.h3}>{slide.title}</h3>
                <div className={styles.p}>{slide.content}</div>
              </div>
            ))}
          </div>
          <button className={styles.prev} onClick={prevSlide}>
            &#10094;
          </button>
          <button className={styles.next} onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </header>
    </>
  );
}

export default Presentation;
