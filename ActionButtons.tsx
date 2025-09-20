import { motion } from "framer-motion";
import { Send, Download, QrCode, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onSend: () => void;
  onReceive: () => void;
}

const ActionButtons = ({ onSend, onReceive }: ActionButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-2 gap-4 mb-6"
    >
      <Button
        variant="send"
        onClick={onSend}
        className="h-16 flex-col space-y-2 rounded-2xl"
      >
        <ArrowUpRight className="w-6 h-6" />
        <span className="font-semibold">Send</span>
      </Button>
      
      <Button
        variant="receive"
        onClick={onReceive}
        className="h-16 flex-col space-y-2 rounded-2xl"
      >
        <ArrowDownLeft className="w-6 h-6" />
        <span className="font-semibold">Receive</span>
      </Button>
    </motion.div>
  );
};

export default ActionButtons;