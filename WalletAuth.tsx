import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface WalletAuthProps {
  onAuthenticated: () => void;
}

const WalletAuth = ({ onAuthenticated }: WalletAuthProps) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async () => {
    if (pin.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter at least 4 digits",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
      toast({
        title: "Welcome back!",
        description: "Successfully authenticated",
      });
    }, 1500);
  };

  const handleBiometric = () => {
    toast({
      title: "Biometric Auth",
      description: "Biometric authentication would open here",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Lock className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your PIN to access your wallet</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Input
              type={showPin ? "text" : "password"}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="glass-card pr-12 text-center text-lg tracking-widest"
              maxLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button
            onClick={handleAuth}
            disabled={isLoading || pin.length < 4}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isLoading ? "Authenticating..." : "Unlock Wallet"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleBiometric}
            className="w-full h-12 glass-card border-primary/30 hover:border-primary/50"
          >
            <Fingerprint className="w-5 h-5 mr-2" />
            Use Biometric Authentication
          </Button>
        </div>

        <div className="mt-8 text-center">
          <button className="text-sm text-primary hover:underline">
            Forgot PIN? Recover with backup phrase
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WalletAuth;