"use client"
import { motion } from "framer-motion";
const WhyUniceps = ({ content }: { content: any }) => {
   return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      {/* خلفية ضوئية خافتة ثابتة خلف النص */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#0095A6]/5 blur-[120px] rounded-full z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* الجانب الأيمن: العنوان (يأتي من اليمين) */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-[#46cdcf] font-medium tracking-[0.2em] text-sm mb-4 uppercase">
          {content.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight" dangerouslySetInnerHTML={{ __html: content.title }}>
                
            </h2>
          </motion.div>

          {/* الجانب الأيسر: النص الشارح (يأتي من اليسار) */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 border-r-2 border-[#46cdcf]/20 pr-8"
          >
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p1 }} />
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: content.p2 }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyUniceps;
