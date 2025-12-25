"use client"
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-x-hidden">
      {/* إضاءة خلفية قوية لهذا القسم خصيصاً */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#0095A6]/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto rounded-[3rem] p-12 md:p-20 bg-white/5 border border-white/10 backdrop-blur-2xl text-center relative overflow-hidden"
      >
        {/* عنصر جمالي: خطوط متدرجة في الزوايا */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#46cdcf]/20 to-transparent blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-[#0095A6]/20 to-transparent blur-2xl" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            جاهز لتحويل ناديك إلى <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#0095A6] to-[#46cdcf]">
              منظومة رقمية؟
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            سواء كنت لاعباً يبحث عن الاحترافية في التتبع، أو صاحب نادي يريد السيطرة الكاملة على الإدارة.. Uniceps هو الحل.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {/* زر الموبايل */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-[#46cdcf] transition-colors"
            >
              تحميل تطبيق الموبايل
            </motion.button>

            {/* زر الديسكتوب */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-2xl hover:border-[#0095A6] transition-colors"
            >
              طلب نسخة الديسكتوب
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default FinalCTA