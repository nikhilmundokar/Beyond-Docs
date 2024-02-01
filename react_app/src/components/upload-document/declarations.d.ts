interface Window {
    ethereum?: any;
  }
declare module 'web3' {
  interface Web3 {
    eth: any; // You might want to replace 'any' with a more specific type if available
    }
  }
