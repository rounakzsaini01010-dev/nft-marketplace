# 🚀 NFT Marketplace — Full-Stack Web3 DApp

A modern, decentralized NFT Marketplace built for creating, listing, and trading digital collectibles on the blockchain with USDT-based payments. Features full on-chain smart contracts, a powerful Laravel REST API backend, and a reactive React/Vite web application with rich analytics.

---

## 🌟 Key Features

- **🎨 NFT Minting**: Mint custom ERC-721 NFTs with metadata, attributes, and image uploads.
- **🛒 Decentralized Marketplace**: Buy and sell NFTs securely with USDT payments and automatic platform fee distribution.
- **📊 Interactive Dashboard**: Real-time sales statistics, portfolio tracking, volume metrics, and interactive charts (ApexCharts).
- **👛 Multi-Wallet Support**: Seamless connection with MetaMask, Coinbase Wallet, Rainbow, etc. via RainbowKit & Wagmi.
- **🌓 Dark & Light Mode**: Sleek UI with modern glassmorphism, responsive navigation, and smooth Framer Motion micro-animations.
- **⚡ High-Performance Backend**: Off-chain indexer, metadata caching, and RESTful API endpoints powered by Laravel.

---

## 🛠️ Tech Stack

### 🔗 Smart Contracts (Blockchain)
- **Solidity** (`^0.8.20`)
- **Hardhat 3** (Testing, compilation, deployment)
- **OpenZeppelin Contracts** (`ERC721`, `IERC20`, `Ownable`, `ReentrancyGuard`, `SafeERC20`)
- **Ethers.js / Viem**

### 💻 Frontend
- **React 19** + **Vite**
- **Tailwind CSS** + **Framer Motion** (Styling & Animations)
- **Wagmi** + **Viem** + **RainbowKit** (Web3 interactions)
- **Zustand** (Global state management)
- **TanStack React Query** (Async data fetching)
- **ApexCharts** (Analytics & visualization)

### ⚙️ Backend (API)
- **PHP 8.2+ / Laravel**
- **MySQL / SQLite**
- **RESTful API** (NFT metadata caching, wallet activity tracking)

---

## 📂 Project Architecture

```
├── contracts/               # Solidity Smart Contracts
│   ├── NFTCollection.sol    # ERC-721 NFT Minting Contract
│   └── NFTMarketplace.sol   # Marketplace with USDT settlement & Escrow
│
├── frontend/                # React + Vite Frontend App
│   ├── src/
│   │   ├── components/      # UI components (Radix UI, landing sections)
│   │   ├── features/        # Marketplace, Minting, Dashboard & Charts
│   │   ├── hooks/           # Web3 contracts & custom React hooks
│   │   ├── routes/          # App routing & pages
│   │   └── store/           # Zustand state management
│   └── package.json
│
├── backend/                 # Laravel REST API
│   ├── app/                 # Controllers, Models, Middleware
│   ├── database/            # Migrations & Seeders
│   ├── routes/api.php       # API endpoints
│   └── composer.json
│
├── scripts/                 # Hardhat deployment scripts
├── hardhat.config.ts        # Hardhat configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PHP](https://www.php.net/) (v8.2+) & [Composer](https://getcomposer.org/)
- [MetaMask](https://metamask.io/) or any EVM Web3 wallet

---

### 2. Smart Contracts Setup

```bash
# Install root dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to local or testnet (e.g., Sepolia)
npx hardhat run scripts/deployMarketplace.ts --network <network_name>
```

---

### 3. Backend Setup (Laravel)

```bash
cd backend

# Install PHP dependencies
composer install

# Set up environment
cp .env.example .env
php artisan key:generate

# Run database migrations
php artisan migrate

# Start Laravel development server
php artisan serve
```

Backend will run at: `http://127.0.0.1:8000`

---

### 4. Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start frontend dev server
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## ⚙️ Environment Variables

### Root / Contracts (`.env`)
```env
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_CHAIN_ID=11155111
VITE_NFT_CONTRACT_ADDRESS=0x...
VITE_MARKETPLACE_CONTRACT_ADDRESS=0x...
VITE_USDT_CONTRACT_ADDRESS=0x...
```

---

## 📜 Smart Contract Overview

| Contract | Description | Standard |
| :--- | :--- | :--- |
| **`NFTCollection.sol`** | Minting digital collectibles with custom token URI & royalty options | ERC-721 |
| **`NFTMarketplace.sol`** | Listing, buying, price adjustment, and platform fees in USDT | Escrow / Marketplace |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/rounakzsaini01010-dev/nft-marketplace/issues).

---

## 📄 License

This project is licensed under the **MIT License**.
