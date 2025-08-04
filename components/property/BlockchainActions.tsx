// Update the import path if the hook exists elsewhere, for example:
// TODO: Ensure the hook exists at the correct path or update the import path accordingly.
// Update the import path to the correct location of useBlockchainProperty
import { useBlockchainProperty } from "@/hooks/useBlockchainProperty";
import { Button } from "@/components/ui/button";

interface BlockchainActionsProps {
  propertyId: string;
  metadataURI: string;
  owner: string;
}

export function BlockchainActions({ propertyId, metadataURI, owner }: BlockchainActionsProps) {
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