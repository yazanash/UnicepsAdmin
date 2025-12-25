import React from "react";
import { motion, AnimatePresence } from "framer-motion";
interface LightOrbsProps {
  activeIndex?: number;
}
const LightOrbs = ({ activeIndex = 0 }: LightOrbsProps) => {
  const orbMovements = [
    {
      orbBottomLeft: { bottom: "5%", left: "-10%", scale: 1, opacity: 0.3 },
      orbTopRight: { top: "5%", right: "-10%", scale: 1, opacity: 0.25 },
    },
    {
      orbBottomLeft: { bottom: "15%", left: "5%", scale: 1.1, opacity: 0.35 },
      orbTopRight: { top: "15%", right: "5%", scale: 0.9, opacity: 0.2 },
    },
    {
      orbBottomLeft: { bottom: "0%", left: "0%", scale: 0.9, opacity: 0.25 },
      orbTopRight: { top: "0%", right: "0%", scale: 1.2, opacity: 0.3 },
    },
  ];

  const current = orbMovements[activeIndex % orbMovements.length];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1: منطقة أسفل اليسار (Bottom-Left) */}
      <motion.div
        animate={{
          bottom: current.orbBottomLeft.bottom,
          left: current.orbBottomLeft.left,
          scale: current.orbBottomLeft.scale,
          opacity: current.orbBottomLeft.opacity,
        }}
        transition={{ type: "spring", stiffness: 20, damping: 25 }} // حركة هادئة جداً
        className="absolute w-150 h-150 bg-[#0095A6] rounded-full blur-[130px]"
      />

      {/* Orb 2: منطقة أعلى اليمين (Top-Right) */}
      <motion.div
        animate={{
          top: current.orbTopRight.top,
          right: current.orbTopRight.right,
          scale: current.orbTopRight.scale,
          opacity: current.orbTopRight.opacity,
        }}
        transition={{ type: "spring", stiffness: 20, damping: 25 }}
        className="absolute w-150 h-150 bg-[#46cdcf] rounded-full blur-[140px]"
      />
    </div>
  );
};

export default LightOrbs;
