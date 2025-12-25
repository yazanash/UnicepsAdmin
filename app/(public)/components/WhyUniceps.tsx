"use client"
import { motion } from "framer-motion";
const WhyUniceps = () => {
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
             Innovation in sports management
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                 Why <span className="text-[#0095A6]">Uniceps</span> is your best choice?
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
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            We designed the system to end the era of randomness. By integrating <span className="text-white">club management</span> and <span className="text-white">player tracking</span> into a single system, we ensure ultra-smooth data flow.
            </p>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                Using <span className="text-[#46cdcf] font-mono">.unx</span> file technology, we give coaches the ability to export their programs and deliver them instantly to subscribers, which improves the quality of service and player results. 
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyUniceps;
