import React from "react";
import { motion } from "framer-motion";

interface LightOrbsProps {
  activeIndex?: number;
}

const LightOrbs = ({ activeIndex = 0 }: LightOrbsProps) => {
  // سنستخدم مصفوفة للإزاحة (Offset) بدلاً من المواقع الثابتة
  const movements = [
    { x1: 0, y1: 0, x2: 0, y2: 0, s1: 1, s2: 1 },         // السلايد 1
    { x1: 100, y1: -50, x2: -100, y2: 50, s1: 1.2, s2: 0.8 }, // السلايد 2
    { x1: -50, y1: 100, x2: 50, y2: -100, s1: 0.9, s2: 1.1 }, // السلايد 3
  ];

  const current = movements[activeIndex % movements.length];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1: Bottom-Left */}
      <motion.div
        animate={{
          x: current.x1,
          y: current.y1,
          scale: current.s1,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        // سطر السحر: يخبر المتصفح باستخدام كرت الشاشة
        style={{ position: 'absolute', bottom: '-10%', left: '-10%', willChange: 'transform' }}
        className="w-150 h-150 bg-[#0095A6] rounded-full blur-[120px] opacity-30"
      />

      {/* Orb 2: Top-Right */}
      <motion.div
        animate={{
          x: current.x2,
          y: current.y2,
          scale: current.s2,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        style={{ position: 'absolute', top: '-10%', right: '-10%', willChange: 'transform' }}
        className="w-150 h-150 bg-[#46cdcf] rounded-full blur-[120px] opacity-25"
      />
    </div>
  );
};

export default LightOrbs;