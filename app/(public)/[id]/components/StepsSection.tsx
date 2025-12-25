import React from "react";
import { motion } from "framer-motion";
import { UserStepType } from "@/types/userStep";
interface StepsSectionProps {
  steps: UserStepType[];
}
const StepsSection = ({ steps }: StepsSectionProps) => {
  return (
    <section className="py-24 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#46cdcf] font-medium mb-2 uppercase tracking-widest text-sm">
            خطوات بسيطة
          </h2>
          <h3 className="text-4xl font-bold text-white">
            كيف تبدأ مع Uniceps؟
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* الخط الرابط الخلفي في الديسكتوب */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group border-2 border-white/10 hover:border-[#46cdcf]/30 transition-all duration-500 rounded-2xl p-5"
            >
              <div className="flex flex-row items-center mb-8">

              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br  flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(70,205,207,0.3)] group-hover:scale-110 transition-transform`}
              >
                {step.stepNumber}
              </div>
                <h4 className="text-2xl font-bold text-white mx-4">
                {step.title}
              </h4>
              </div>
             
              <p className="text-gray-400 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
