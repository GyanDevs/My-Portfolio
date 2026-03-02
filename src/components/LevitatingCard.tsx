import { motion } from "framer-motion";
import React from "react";
interface LevitatingCardProps {
  children: React.ReactNode;
}
const LevitatingCard: React.FC<LevitatingCardProps> = ({ children }) => {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg"
    >
      {" "}
      {children}{" "}
    </motion.div>
  );
};
export default LevitatingCard;
