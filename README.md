# ArdhiX: Blockchain-powered Land Registry

## Features
- Secure Auth (Supabase)
- Property registration, transfer, verification
- Document and map integration
- Blockchain-backed on-chain property proof (Ethereum compatible)
- Wallet connect, register, transfer on-chain
- Responsive, error-free, consistent UI

## Blockchain Integration

- Smart contract: `blockchain/contracts/ArdhiXRegistry.sol`
- ethers.js integration: `lib/blockchain.ts`
- UI hooks and components for wallet connect, register, transfer
- All property registration and transfer can be optionally recorded on-chain

## Setup
1. Deploy Solidity contract (`ArdhiXRegistry.sol`) to Ethereum-compatible testnet, copy address to `.env.local` as `NEXT_PUBLIC_ARDHIX_CONTRACT_ADDRESS`
2. Run `pnpm install`
3. Set up Supabase and update env vars
4. Run `pnpm dev` and access at `localhost:3000`

## Tech
- Next.js, Tailwind, Shadcn/ui
- Supabase (Auth, DB, Storage)
- ethers.js (Web3)
- Solidity (Smart Contract)
