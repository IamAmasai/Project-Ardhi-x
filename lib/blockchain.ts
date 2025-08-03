import { ethers } from "ethers";
import ArdhiXRegistryAbi from "@/blockchain/abis/ArdhiXRegistry.json";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ARDHIX_CONTRACT_ADDRESS!;

export class BlockchainService {
  static getProvider() {
    if (typeof window === "undefined") throw new Error("No window");
    return new ethers.BrowserProvider(window.ethereum);
  }

  static async connectWallet() {
    const provider = this.getProvider();
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
  }

  static getContract(signerOrProvider?: ethers.Provider | ethers.Signer) {
    const provider = signerOrProvider || this.getProvider();
    return new ethers.Contract(CONTRACT_ADDRESS, ArdhiXRegistryAbi, provider);
  }

  static async registerProperty(propertyId: number, metadataURI: string) {
    const provider = this.getProvider();
    const signer = await provider.getSigner();
    const contract = this.getContract(signer);
    const tx = await contract.registerProperty(propertyId, metadataURI);
    return tx.wait();
  }

  static async transferProperty(propertyId: number, to: string) {
    const provider = this.getProvider();
    const signer = await provider.getSigner();
    const contract = this.getContract(signer);
    const tx = await contract.transferProperty(propertyId, to);
    return tx.wait();
  }

  static async getPropertyOwner(propertyId: number) {
    const contract = this.getContract();
    return contract.getPropertyOwner(propertyId);
  }
}