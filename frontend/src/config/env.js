// RainbowKit's public example projectId — used only as a dev fallback so the
// app doesn't crash when VITE_WALLETCONNECT_PROJECT_ID hasn't been set yet.
const FALLBACK_WALLETCONNECT_PROJECT_ID = "21fef48091f12692cad574a6f7753643";

export const env = {
  walletConnectProjectId:
    import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || FALLBACK_WALLETCONNECT_PROJECT_ID,
  alchemyApiKey: import.meta.env.VITE_ALCHEMY_API_KEY ?? "",
  appName: import.meta.env.VITE_APP_NAME ?? "NFT Marketplace",
  nftCollectionAddress: import.meta.env.VITE_NFT_COLLECTION_ADDRESS ?? "",
  nftMarketplaceAddress: import.meta.env.VITE_NFT_MARKETPLACE_ADDRESS ?? "",
  usdtAddress: import.meta.env.VITE_USDT_ADDRESS ?? "",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  bscTestnetRpcUrl:
    import.meta.env.VITE_BSC_TESTNET_RPC_URL || "https://bsc-testnet.rpc.sentio.xyz",
};
