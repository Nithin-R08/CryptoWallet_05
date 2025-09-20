import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, HelpCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface SendCryptoProps {
  onBack: () => void;
}

const SendCrypto = ({ onBack }: SendCryptoProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    asset: "",
    address: "",
    amount: "",
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mockAssets = [
    { symbol: "BTC", name: "Bitcoin", balance: "0.00234", fee: "0.00005" },
    { symbol: "ETH", name: "Ethereum", balance: "0.0891", fee: "0.002" },
    { symbol: "USDT", name: "Tether", balance: "1,250.00", fee: "1.00" },
  ];

  const selectedAsset = mockAssets.find(asset => asset.symbol === formData.asset);

  const handleNext = () => {
    if (step === 1 && (!formData.asset || !formData.address)) {
      toast({
        title: "Missing information",
        description: "Please select an asset and enter a recipient address",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !formData.amount) {
      toast({
        title: "Missing amount",
        description: "Please enter the amount to send",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleSend = async () => {
    setIsLoading(true);
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Transaction sent!",
        description: "Your crypto is on its way",
      });
      onBack();
    }, 2000);
  };

  const stepTitles = [
    "Enter Details",
    "Set Amount",
    "Review & Confirm",
    "Transaction Sent"
  ];

  const stepDescriptions = [
    "Choose what to send and where",
    "Specify how much to send",
    "Double-check everything looks correct",
    "Your transaction is being processed"
  ];

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
            <h1 className="text-xl font-bold text-foreground">Send Crypto</h1>
            <p className="text-sm text-muted-foreground">{stepDescriptions[step - 1]}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index + 1 <= step 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index + 1 <= step ? <CheckCircle className="w-4 h-4" /> : index + 1}
              </div>
              <span className="text-xs text-muted-foreground mt-1 text-center">{title}</span>
              {index < stepTitles.length - 1 && (
                <div className={`w-full h-0.5 mt-2 ${
                  index + 1 < step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Enter Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="asset">Select Asset</Label>
                <Select value={formData.asset} onValueChange={(value) => setFormData({...formData, asset: value})}>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Choose cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAssets.map((asset) => (
                      <SelectItem key={asset.symbol} value={asset.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <span>{asset.name} ({asset.symbol})</span>
                          <span className="text-muted-foreground ml-2">
                            Balance: {asset.balance}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Label htmlFor="address">Recipient Address</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">This is like an email address for crypto. Make sure it's correct - transactions can't be reversed!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="address"
                  placeholder="Enter wallet address or scan QR"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="glass-card font-mono text-sm"
                />
              </div>

              <Button 
                onClick={handleNext} 
                className="w-full" 
                variant="send"
                disabled={!formData.asset || !formData.address}
              >
                Continue to Amount
              </Button>
            </motion.div>
          )}

          {/* Step 2: Set Amount */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-overlay p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sending</span>
                  <span className="font-semibold">{selectedAsset?.name}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-muted-foreground">Available</span>
                  <span className="text-sm">{selectedAsset?.balance} {selectedAsset?.symbol}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="glass-card pr-16 text-lg"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {selectedAsset?.symbol}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <button 
                    onClick={() => setFormData({...formData, amount: (parseFloat(selectedAsset?.balance || "0") * 0.25).toString()})}
                    className="text-xs text-primary hover:underline"
                  >
                    25%
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, amount: (parseFloat(selectedAsset?.balance || "0") * 0.5).toString()})}
                    className="text-xs text-primary hover:underline"
                  >
                    50%
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, amount: (parseFloat(selectedAsset?.balance || "0") * 0.75).toString()})}
                    className="text-xs text-primary hover:underline"
                  >
                    75%
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, amount: selectedAsset?.balance || "0"})}
                    className="text-xs text-primary hover:underline"
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="glass-overlay p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Network Fee</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">This fee goes to miners who process your transaction. Higher fees = faster processing.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="font-semibold">{selectedAsset?.fee} {selectedAsset?.symbol}</span>
                </div>
              </div>

              <Button 
                onClick={handleNext} 
                className="w-full" 
                variant="send"
                disabled={!formData.amount || parseFloat(formData.amount) <= 0}
              >
                Review Transaction
              </Button>
            </motion.div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-overlay p-4 rounded-xl">
                <h3 className="font-semibold mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-warning mr-2" />
                  Review Carefully
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sending</span>
                    <span>{formData.amount} {selectedAsset?.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-mono text-xs">{formData.address.slice(0, 8)}...{formData.address.slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span>{selectedAsset?.fee} {selectedAsset?.symbol}</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{(parseFloat(formData.amount) + parseFloat(selectedAsset?.fee || "0")).toFixed(6)} {selectedAsset?.symbol}</span>
                  </div>
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
                <p className="text-sm text-warning-foreground">
                  ⚠️ Crypto transactions cannot be reversed. Please double-check the recipient address.
                </p>
              </div>

              <Button 
                onClick={handleSend} 
                className="w-full" 
                variant="send"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : `Send ${formData.amount} ${selectedAsset?.symbol}`}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SendCrypto;