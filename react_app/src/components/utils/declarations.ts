// declarations.ts

interface Window {
  ethereum?: any;
}

declare module "web3" {
  export interface Web3 {
    eth: {
      getAccounts(): Promise<string[]>;
      // Add other eth properties or methods as needed
    };
    // Add other Web3 properties or methods as needed
  }
}

// Your other code...
