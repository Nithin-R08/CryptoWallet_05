import { motion } from "framer-motion";
import WalletBalance from "./WalletBalance";
import ActionButtons from "./ActionButtons";
import TransactionHistory from "./TransactionHistory";

interface WalletDashboardProps {
  onSend: () => void;
  onReceive: () => void;
}

const WalletDashboard = ({ onSend, onReceive }: WalletDashboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 max-w-md mx-auto wallet-enter"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">My Wallet</h1>
        <p className="text-muted-foreground">Manage your crypto portfolio</p>
      </div>

      <WalletBalance />
      <ActionButtons onSend={onSend} onReceive={onReceive} />
      <TransactionHistory />
    </motion.div>
  );
};

export default WalletDashboard;