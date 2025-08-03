import { useBlockchainProperty } from "@/hooks/useBlockchainProperty";
import { Button } from "@/components/ui/button";

export function BlockchainActions({ propertyId, metadataURI, owner }) {
  const {
    wallet,
    connectWallet,
    registerProperty,
    transferProperty,
    txStatus,
  } = useBlockchainProperty();

  return (
    <div className="space-y-2">
      {!wallet && (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
      <Button onClick={() => registerProperty(propertyId, metadataURI)} disabled={!wallet}>
        Register on Blockchain
      </Button>
      <Button
        onClick={() => transferProperty(propertyId, prompt("New owner address:")!)}
        disabled={!wallet || !propertyId}
      >
        Transfer Ownership
      </Button>
      {txStatus && <div className="text-sm">{txStatus}</div>}
    </div>
  );
}