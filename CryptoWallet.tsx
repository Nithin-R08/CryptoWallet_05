import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WalletAuth from "@/components/WalletAuth";
import WalletDashboard from "@/components/WalletDashboard";
import SendCrypto from "@/components/SendCrypto";
import ReceiveCrypto from "@/components/ReceiveCrypto";

type AppState = "auth" | "dashboard" | "send" | "receive";

const CryptoWallet = () => {
  const [currentState, setCurrentState] = useState<AppState>("auth");

  const handleAuthenticated = () => {
    setCurrentState("dashboard");
  };

  const handleSend = () => {
    setCurrentState("send");
  };

  const handleReceive = () => {
    setCurrentState("receive");
  };

  const handleBackToDashboard = () => {
    setCurrentState("dashboard");
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentState === "auth" && (
          <WalletAuth key="auth" onAuthenticated={handleAuthenticated} />
        )}
        {currentState === "dashboard" && (
          <WalletDashboard 
            key="dashboard" 
            onSend={handleSend} 
            onReceive={handleReceive} 
          />
        )}
        {currentState === "send" && (
          <SendCrypto key="send" onBack={handleBackToDashboard} />
        )}
        {currentState === "receive" && (
          <ReceiveCrypto key="receive" onBack={handleBackToDashboard} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CryptoWallet;