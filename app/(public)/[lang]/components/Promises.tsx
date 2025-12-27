"use client"
import { motion } from "framer-motion";
const Promises = ({ content }: { content: any }) => {
    const icons = ["🎯", "✨", "🤝", "🚀"];
  return (
  <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* رأس القسم */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-right"
          >
            <h2 className="text-[#46cdcf] font-medium mb-4">{content.badge}</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white" dangerouslySetInnerHTML={{ __html: content.title }} />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 max-w-sm text-right"
          >
         {content.description}
          </motion.p>
        </div>

        {/* شبكة الوعود */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {content.list.map((p: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }} // تأثير التوالي (Stagger)
              className="group"
            >
              <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                {icons[i]}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#46cdcf] transition-colors">
              {p.title}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Promises