import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, QrCode, HelpCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

interface ReceiveCryptoProps {
  onBack: () => void;
}

const ReceiveCrypto = ({ onBack }: ReceiveCryptoProps) => {
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const mockAssets = [
    { 
      symbol: "BTC", 
      name: "Bitcoin", 
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    },
    { 
      symbol: "ETH", 
      name: "Ethereum", 
      address: "0x742d35Cc6634C0532925a3b8D429d429d429d429"
    },
    { 
      symbol: "USDT", 
      name: "Tether", 
      address: "TQn9Y2khEsLJW1ChVWFMSMeRDow5oREqjK"
    },
  ];

  const currentAsset = mockAssets.find(asset => asset.symbol === selectedAsset);

  const handleCopyAddress = async () => {
    if (currentAsset) {
      try {
        await navigator.clipboard.writeText(currentAsset.address);
        setCopied(true);
        toast({
          title: "Address copied!",
          description: "Share this address to receive crypto",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Please copy the address manually",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Receive Crypto</h1>
            <p className="text-sm text-muted-foreground">Share your address to receive payments</p>
          </div>
        </div>

        {/* Asset Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Cryptocurrency
          </label>
          <Select value={selectedAsset} onValueChange={setSelectedAsset}>
            <SelectTrigger className="glass-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockAssets.map((asset) => (
                <SelectItem key={asset.symbol} value={asset.symbol}>
                  {asset.name} ({asset.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* QR Code */}
        <motion.div
          key={selectedAsset}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-2xl mb-6 flex justify-center"
        >
          <QRCodeSVG
            value={currentAsset?.address || ""}
            size={200}
            level="M"
            includeMargin={true}
          />
        </motion.div>

        {/* Address Display */}
        <div className="glass-overlay p-4 rounded-xl mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Your {selectedAsset} Address</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">This is like your account number for {selectedAsset}. Share it to receive payments safely.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="font-mono text-sm text-foreground break-all p-3 bg-muted/20 rounded-lg">
            {currentAsset?.address}
          </div>
        </div>

        {/* Copy Button */}
        <Button
          onClick={handleCopyAddress}
          variant="receive"
          className="w-full mb-4"
          disabled={copied}
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Address Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </>
          )}
        </Button>

        {/* Safety Notice */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
          <h4 className="font-semibold text-primary mb-2">💡 Safety Tips</h4>
          <ul className="text-sm text-foreground space-y-1">
            <li>• Only share this address with trusted senders</li>
            <li>• Make sure they send the correct cryptocurrency ({selectedAsset})</li>
            <li>• Transactions may take time to confirm on the network</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ReceiveCrypto;