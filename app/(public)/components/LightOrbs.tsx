import React from "react";
import { motion } from "framer-motion";

interface LightOrbsProps {
  activeIndex?: number;
}

const LightOrbs = ({ activeIndex = 0 }: LightOrbsProps) => {
  // أعدت لك نفس القيم القوية التي كانت تحرك الأورب لمسافات بعيدة
  const movements = [
    { x1: 0, y1: 0, x2: 0, y2: 0, scale1: 1, scale2: 1 },
    { x1: 300, y1: -200, x2: -300, y2: 200, scale1: 1.2, scale2: 0.8 }, // حركة واسعة جداً
    { x1: 150, y1: -400, x2: -150, y2: 400, scale1: 0.9, scale2: 1.3 }, // تغيير جذري في المواقع
  ];

  const current = movements[activeIndex % movements.length];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1: Bottom-Left */}
      <motion.div
        animate={{
          x: current.x1,
          y: current.y1,
          scale: current.scale1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 15, // تقليل القسوة لجعل الحركة ناعمة وواضحة
          damping: 20,
          mass: 1 
        }}
        style={{ 
          position: 'absolute', 
          bottom: '10%', 
          left: '10%', 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
        className="w-75 h-75 md:h-150 md:w-150 bg-[#0095A6] rounded-full blur-[130px] opacity-30"
      />

      {/* Orb 2: Top-Right */}
      <motion.div
        animate={{
          x: current.x2,
          y: current.y2,
          scale: current.scale2,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 15, 
          damping: 20,
          mass: 1
        }}
        style={{ 
          position: 'absolute', 
          top: '10%', 
          right: '10%', 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
        className="w-75 h-75 md:h-150 md:w-150 bg-[#46cdcf] rounded-full blur-[140px] opacity-25"
      />
    </div>
  );
};

export default LightOrbs;