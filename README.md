# EthenaSea - NFT Marketplace with USDe

Welcome to **EthenaSea**, a decentralized NFT marketplace built on the ethena blockchain. At EthenaSea, users can **buy**, **sell**, and **list** NFTs using **USDe**. This ensures that NFT transactions are reliable, stable, and simple to conduct, free from volatile price fluctuations.

## Features

- **Buy and Sell NFTs**: Effortlessly trade NFTs using USDe for stable pricing and quick transactions.
- **List NFTs**: Creators can list their NFTs for sale in just a few clicks, enabling easy discovery and visibility.
- **Secure Transactions**: Built on blockchain technology, EthenaSea provides secure, transparent, and verifiable NFT transactions.
- **User-Friendly Interface**: Simple and intuitive UI/UX to browse, buy, and manage NFTs.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Metamask](https://metamask.io/)
- [Truffle](https://www.trufflesuite.com/truffle)
- USDe wallet support

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mxber2022/Ethena.git
   cd EthenaSea
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contracts:

   ```bash
   truffle compile
   ```

4. Deploy the smart contracts to your preferred network:

   ```bash
   truffle migrate --network <network-name>
   ```

5. Start the application:
   ```bash
   npm start
   ```

### Configuring USDe for Transactions

To enable USDe transactions within EthenaSea, ensure that your wallet supports USDe and is connected to the appropriate blockchain network.

1. Add USDe to your wallet (e.g., Metamask).
2. Connect your wallet to the marketplace.
3. Use USDe for all NFT purchases, sales, and listings.

## Smart Contract

The NFT marketplace is powered by smart contracts that facilitate transactions. Below is a brief overview of the main contract used:

- **Marketplace Contract**: Handles the listing, buying, and selling of NFTs.
- **USDe Integration**: All transactions on EthenaSea are done using USDe, ensuring price stability.

## Usage

1. **List NFTs**: Navigate to the "Create" page to list a new NFT for sale. Set the price in USDe and confirm the listing.
2. **Buy NFTs**: Browse the marketplace, select an NFT, and purchase using your USDe balance.
3. **Sell NFTs**: List your owned NFTs for sale, and once purchased, the USDe will be transferred to your account.

## Development

To contribute to the EthenaSea project:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request to merge your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For any questions, issues, or suggestions, feel free to open an issue on GitHub or contact us at **support@ethenasea.com**.

---

This README provides a clear overview of the project and guides users on how to get started with EthenaSea.
