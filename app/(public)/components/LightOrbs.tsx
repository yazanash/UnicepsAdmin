import React from "react";
import { motion } from "framer-motion";

const LightOrbs = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1: حركة عائمة ومستقلة */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0], // تحريك أفقي عشوائي
          y: [0, -40, 20, 0], // تحريك رأسي عشوائي
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15, // وقت طويل ليكون التغيير ناعم جداً وغير محسوس
          repeat: Infinity,
          ease: "easeInOut",
        }}
        // استخدام translateZ(0) لتفعيل تسريع الـ GPU
        style={{ transform: 'translateZ(0)' }} 
        className="absolute -bottom-20 -left-20 w-150 h-150 bg-[#0095A6] rounded-full blur-[100px] opacity-30"
      />

      {/* Orb 2: حركة عكسية */}
      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transform: 'translateZ(0)' }}
        className="absolute -top-20 -right-20 w-150 h-150 bg-[#46cdcf] rounded-full blur-[110px] opacity-20"
      />
    </div>
  );
};

export default LightOrbs;