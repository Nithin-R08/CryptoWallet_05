import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Transaction {
  id: string;
  type: "send" | "receive";
  asset: string;
  amount: string;
  usdValue: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  address: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "receive",
    asset: "BTC",
    amount: "+0.001",
    usdValue: "+$67.23",
    status: "completed",
    timestamp: "2 hours ago",
    address: "1A1z...xY9z",
  },
  {
    id: "2",
    type: "send",
    asset: "ETH",
    amount: "-0.05",
    usdValue: "-$131.45",
    status: "pending",
    timestamp: "5 hours ago",
    address: "0x742...d4e2",
  },
  {
    id: "3",
    type: "receive",
    asset: "USDT",
    amount: "+250.00",
    usdValue: "+$250.00",
    status: "completed",
    timestamp: "1 day ago",
    address: "1B2c...zX8w",
  },
  {
    id: "4",
    type: "send",
    asset: "BTC",
    amount: "-0.002",
    usdValue: "-$134.46",
    status: "failed",
    timestamp: "2 days ago",
    address: "1D4e...aB7c",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-success" />;
    case "pending":
      return <Clock className="w-4 h-4 text-warning" />;
    case "failed":
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-success/20 text-success border-success/30">Success</Badge>;
    case "pending":
      return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
    case "failed":
      return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Failed</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const TransactionHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Your transaction history shows all crypto sent and received. Green = completed, Yellow = processing, Red = failed.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        {mockTransactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-xl glass-overlay hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                {tx.type === "send" ? (
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-foreground capitalize">
                    {tx.type} {tx.asset}
                  </span>
                  {getStatusIcon(tx.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  To: {tx.address}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className={`font-semibold ${tx.type === 'receive' ? 'text-success' : 'text-foreground'}`}>
                    {tx.amount} {tx.asset}
                  </div>
                  <div className="text-sm text-muted-foreground">{tx.usdValue}</div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-1">
                {getStatusBadge(tx.status)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{tx.timestamp}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {mockTransactions.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <div className="text-4xl mb-2">💰</div>
          <p>No transactions yet</p>
          <p className="text-sm">Your transaction history will appear here</p>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionHistory;