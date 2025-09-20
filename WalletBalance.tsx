import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CryptoAsset {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
  change24h: number;
  icon: string;
}

const mockAssets: CryptoAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.00234",
    usdValue: "$156.78",
    change24h: 2.45,
    icon: "₿",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "0.0891",
    usdValue: "$234.12",
    change24h: -1.23,
    icon: "Ξ",
  },
  {
    symbol: "USDT",
    name: "Tether",
    balance: "1,250.00",
    usdValue: "$1,250.00",
    change24h: 0.01,
    icon: "₮",
  },
];

const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  const totalBalance = mockAssets.reduce((sum, asset) => {
    return sum + parseFloat(asset.usdValue.replace("$", "").replace(",", ""));
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Portfolio Balance</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
      </div>

      <div className="text-center mb-6">
        <motion.div
          key={showBalance ? "shown" : "hidden"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold text-foreground balance-glow"
        >
          {showBalance ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "••••••"}
        </motion.div>
        <p className="text-muted-foreground mt-1">Total Portfolio Value</p>
      </div>

      <div className="space-y-3">
        {mockAssets.map((asset, index) => (
          <motion.div
            key={asset.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl glass-overlay"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                {asset.icon}
              </div>
              <div>
                <div className="font-semibold text-foreground">{asset.symbol}</div>
                <div className="text-sm text-muted-foreground">{asset.name}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-foreground">
                {showBalance ? asset.balance : "••••"}
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-muted-foreground">
                  {showBalance ? asset.usdValue : "••••"}
                </span>
                <div className={`flex items-center ${asset.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="ml-1">{Math.abs(asset.change24h)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WalletBalance;