"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQsType } from "@/types/faqs";
import { ChevronDown } from "lucide-react";

interface FAQSectionProps {
  faqs: FAQsType[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <h2 className="text-[#46cdcf] font-medium mb-4 uppercase tracking-widest text-sm">الأسئلة الشائعة</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">هل لديك استفسارات؟</h3>
        </div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden backdrop-blur-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-right transition-colors hover:bg-white/5"
              >
                <motion.span 
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="text-[#46cdcf]"
                >
                  <ChevronDown size={20} />
                </motion.span>
                <span className="text-lg font-semibold text-white/90">
                  {faq.question}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;