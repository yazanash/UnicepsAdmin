import React from "react";
import { motion } from "framer-motion";

interface LightOrbsProps {
  activeIndex?: number;
}

const LightOrbs = ({ activeIndex = 0 }: LightOrbsProps) => {
  // هذه هي "الإزاحات" التي تعطي نفس أماكنك القديمة بالضبط
  const movements = [
    { x1: 0, y1: 0, x2: 0, y2: 0, s1: 1, s2: 1, op1: 0.3, op2: 0.25 }, // الحالة 1 (الأصلية)
    {
      x1: 200,
      y1: -100,
      x2: -150,
      y2: 150,
      s1: 1.1,
      s2: 0.9,
      op1: 0.35,
      op2: 0.2,
    }, // الحالة 2 (توسع)
    { x1: 100, y1: 50, x2: 50, y2: -50, s1: 0.9, s2: 1.2, op1: 0.25, op2: 0.3 }, // الحالة 3 (تداخل)
  ];

  const current = movements[activeIndex % movements.length];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Orb 1: كانت Bottom-Left */}
      <motion.div
        animate={{
          x: current.x1,
          y: current.y1,
          scale: current.s1,
          opacity: current.op1,
        }}
        transition={{ type: "spring", stiffness: 20, damping: 25 }}
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-10%",
          willChange: "transform", // يسرع المعالجة
        }}
        className="w-150 h-150 bg-[#0095A6] rounded-full blur-[130px]"
      />

      {/* Orb 2: كانت Top-Right */}
      <motion.div
        animate={{
          x: current.x2,
          y: current.y2,
          scale: current.s2,
          opacity: current.op2,
        }}
        transition={{ type: "spring", stiffness: 20, damping: 25 }}
        style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          willChange: "transform",
        }}
        className="w-150 h-150 bg-[#46cdcf] rounded-full blur-[140px]"
      />
    </div>
  );
};

export default LightOrbs;
