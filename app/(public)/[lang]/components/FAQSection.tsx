"use client";
import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  lang: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs = [], lang }) => {
  if (!faqs || faqs.length === 0) return null;

  const isAr = lang === "ar";
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="FAQs" className="relative max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="bg-teal-500/10 text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest">
          {isAr ? "الأسئلة الشائعة" : "FAQ"}
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white mt-3">
          {isAr
            ? "كل ما تريد معرفته عن المنظومة"
            : "Everything you need to know"}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          {isAr
            ? "إجابات واضحة على أبرز الأسئلة والاستفسارات التقنية والتشغيلية."
            : "Clear answers to top technical and operational questions."}
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`border rounded-2xl bg-dark-900/60 transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "border-teal-500/50 shadow-lg shadow-teal-500/5"
                  : "border-slate-800"
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-start p-5 flex justify-between items-center text-sm font-bold text-white hover:text-teal-400 transition"
              >
                <span className="pe-4">
                  {isAr ? faq.questionAr : faq.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-xl bg-dark-950 flex items-center justify-center text-teal-400 text-base shrink-0 border border-slate-800 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Smooth Grid Animation Wrapper */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-5 px-5"
                    : "grid-rows-[0fr] opacity-0 pb-0 px-5"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="text-xs text-slate-300 border-t border-slate-800/60 pt-4 leading-relaxed">
                    {isAr ? faq.answerAr : faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
